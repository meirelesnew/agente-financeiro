"""
Agente Financeiro - Aplicação Web com Flask
Sistema completo de controle financeiro (Transações + Contratos)
"""

from flask import Flask, render_template, request, jsonify, send_file
from datetime import datetime, timedelta
import json
import os
from pathlib import Path
import io

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

# Diretório de dados
DATA_DIR = Path(__file__).parent / 'dados'
DATA_DIR.mkdir(exist_ok=True)

TRANSACOES_FILE = DATA_DIR / 'transacoes.json'
CONTRATOS_FILE = DATA_DIR / 'contratos.json'

# ============ FUNÇÕES DE PERSISTÊNCIA ============

def carregar_transacoes():
    """Carrega transações do arquivo JSON"""
    if TRANSACOES_FILE.exists():
        try:
            with open(TRANSACOES_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            return []
    return []

def carregar_contratos():
    """Carrega contratos do arquivo JSON"""
    if CONTRATOS_FILE.exists():
        try:
            with open(CONTRATOS_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            return []
    return []

def salvar_transacoes(transacoes):
    """Salva transações no arquivo JSON"""
    with open(TRANSACOES_FILE, 'w', encoding='utf-8') as f:
        json.dump(transacoes, f, ensure_ascii=False, indent=2)

def salvar_contratos(contratos):
    """Salva contratos no arquivo JSON"""
    with open(CONTRATOS_FILE, 'w', encoding='utf-8') as f:
        json.dump(contratos, f, ensure_ascii=False, indent=2)

# ============ ROTAS - PÁGINAS ============

@app.route('/')
def index():
    """Página principal"""
    return render_template('index.html')

@app.route('/static/<path:filename>')
def serve_static(filename):
    """Serve arquivos estáticos (PWA)"""
    from flask import send_from_directory
    return send_from_directory('static', filename)

# ============ API - TRANSAÇÕES ============

@app.route('/api/transacoes', methods=['GET'])
def get_transacoes():
    """Retorna todas as transações"""
    transacoes = carregar_transacoes()
    return jsonify(transacoes)

@app.route('/api/transacoes', methods=['POST'])
def criar_transacao():
    """Cria uma nova transação"""
    try:
        data = request.get_json()
        transacoes = carregar_transacoes()
        
        nova_transacao = {
            'id': int(datetime.now().timestamp() * 1000),
            'tipo': data.get('tipo'),  # 'entrada' ou 'saida'
            'descricao': data.get('descricao'),
            'valor': float(data.get('valor', 0)),
            'categoria': data.get('categoria'),
            'data': datetime.now().isoformat(),
            'dataISO': datetime.now().date().isoformat()
        }
        
        transacoes.insert(0, nova_transacao)
        salvar_transacoes(transacoes)
        
        return jsonify({'success': True, 'transacao': nova_transacao}), 201
    except Exception as e:
        return jsonify({'success': False, 'erro': str(e)}), 400

@app.route('/api/transacoes/<int:id>', methods=['DELETE'])
def deletar_transacao(id):
    """Deleta uma transação"""
    try:
        transacoes = carregar_transacoes()
        transacoes = [t for t in transacoes if t['id'] != id]
        salvar_transacoes(transacoes)
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'erro': str(e)}), 400

@app.route('/api/relatorio', methods=['GET'])
def get_relatorio():
    """Retorna relatório com totais por categoria"""
    filtro = request.args.get('filtro', 'mes')  # 'mes' ou 'todos'
    transacoes = carregar_transacoes()
    
    # Filtrar por mês se necessário
    if filtro == 'mes':
        hoje = datetime.now().date()
        primeiro_dia = hoje.replace(day=1)
        transacoes = [
            t for t in transacoes 
            if datetime.fromisoformat(t['dataISO']).date() >= primeiro_dia
        ]
    
    # Calcular totais
    entradas = sum(t['valor'] for t in transacoes if t['tipo'] == 'entrada')
    saidas = sum(t['valor'] for t in transacoes if t['tipo'] == 'saida')
    saldo = entradas - saidas
    
    # Totais por categoria
    categorias = ['geral', 'salario', 'alimentacao', 'transporte', 'moradia', 'lazer', 'saude', 'outros']
    por_categoria = {}
    
    for cat in categorias:
        cat_entrada = sum(t['valor'] for t in transacoes if t['tipo'] == 'entrada' and t['categoria'] == cat)
        cat_saida = sum(t['valor'] for t in transacoes if t['tipo'] == 'saida' and t['categoria'] == cat)
        por_categoria[cat] = {
            'entrada': cat_entrada,
            'saida': cat_saida,
            'saldo': cat_entrada - cat_saida
        }
    
    return jsonify({
        'entradas': entradas,
        'saidas': saidas,
        'saldo': saldo,
        'por_categoria': por_categoria
    })

# ============ API - CONTRATOS ============

@app.route('/api/contratos', methods=['GET'])
def get_contratos():
    """Retorna todos os contratos"""
    contratos = carregar_contratos()
    
    # Verificar atrasados
    hoje = datetime.now().date()
    for c in contratos:
        if c['status'] == 'pendente':
            venc = datetime.fromisoformat(c['vencimento']).date()
            if venc < hoje:
                c['status'] = 'atrasado'
    
    salvar_contratos(contratos)
    return jsonify(contratos)

@app.route('/api/contratos', methods=['POST'])
def criar_contrato():
    """Cria um novo contrato"""
    try:
        data = request.get_json()
        contratos = carregar_contratos()
        
        novo_contrato = {
            'id': int(datetime.now().timestamp() * 1000),
            'cliente': data.get('cliente'),
            'titulo': data.get('titulo'),
            'valor': float(data.get('valor', 0)),
            'vencimento': data.get('vencimento'),
            'whatsapp': data.get('whatsapp', ''),
            'email': data.get('email', ''),
            'observacao': data.get('observacao', ''),
            'status': 'pendente',
            'dataCriacao': datetime.now().isoformat()
        }
        
        contratos.insert(0, novo_contrato)
        salvar_contratos(contratos)
        
        return jsonify({'success': True, 'contrato': novo_contrato}), 201
    except Exception as e:
        return jsonify({'success': False, 'erro': str(e)}), 400

@app.route('/api/contratos/<int:id>/pagar', methods=['PUT'])
def marcar_como_pago(id):
    """Marca contrato como pago"""
    try:
        contratos = carregar_contratos()
        contrato = next((c for c in contratos if c['id'] == id), None)
        
        if not contrato:
            return jsonify({'success': False, 'erro': 'Contrato não encontrado'}), 404
        
        contrato['status'] = 'pago'
        contrato['dataPagamento'] = datetime.now().isoformat()
        
        salvar_contratos(contratos)
        
        # Retornar para adicionar automaticamente como transação se desejado
        return jsonify({'success': True, 'contrato': contrato})
    except Exception as e:
        return jsonify({'success': False, 'erro': str(e)}), 400

@app.route('/api/contratos/<int:id>/pendente', methods=['PUT'])
def marcar_como_pendente(id):
    """Marca contrato como pendente novamente"""
    try:
        contratos = carregar_contratos()
        contrato = next((c for c in contratos if c['id'] == id), None)
        
        if not contrato:
            return jsonify({'success': False, 'erro': 'Contrato não encontrado'}), 404
        
        contrato['status'] = 'pendente'
        if 'dataPagamento' in contrato:
            del contrato['dataPagamento']
        
        salvar_contratos(contratos)
        return jsonify({'success': True, 'contrato': contrato})
    except Exception as e:
        return jsonify({'success': False, 'erro': str(e)}), 400

@app.route('/api/contratos/<int:id>', methods=['DELETE'])
def deletar_contrato(id):
    """Deleta um contrato"""
    try:
        contratos = carregar_contratos()
        contratos = [c for c in contratos if c['id'] != id]
        salvar_contratos(contratos)
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'erro': str(e)}), 400

@app.route('/api/contratos/resumo', methods=['GET'])
def resumo_contratos():
    """Retorna resumo dos contratos por status"""
    contratos = carregar_contratos()
    
    pendentes = sum(c['valor'] for c in contratos if c['status'] == 'pendente')
    pagos = sum(c['valor'] for c in contratos if c['status'] == 'pago')
    atrasados = sum(c['valor'] for c in contratos if c['status'] == 'atrasado')
    
    return jsonify({
        'pendentes': pendentes,
        'pagos': pagos,
        'atrasados': atrasados
    })

# ============ API - BACKUP ============

@app.route('/api/backup', methods=['POST'])
def fazer_backup():
    """Faz backup de todos os dados"""
    try:
        transacoes = carregar_transacoes()
        contratos = carregar_contratos()
        
        dados = {
            'transacoes': transacoes,
            'contratos': contratos,
            'dataExportacao': datetime.now().isoformat()
        }
        
        # Criar arquivo de backup
        nome_arquivo = f"backup_financeiro_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        
        # Retornar como download
        memoria = io.BytesIO()
        memoria.write(json.dumps(dados, ensure_ascii=False, indent=2).encode('utf-8'))
        memoria.seek(0)
        
        return send_file(
            memoria,
            mimetype='application/json',
            as_attachment=True,
            download_name=nome_arquivo
        )
    except Exception as e:
        return jsonify({'success': False, 'erro': str(e)}), 400

@app.route('/api/limpar', methods=['POST'])
def limpar_todos_dados():
    """Limpa todos os dados (com confirmação)"""
    try:
        confirmar = request.get_json().get('confirmar', False)
        
        if not confirmar:
            return jsonify({'success': False, 'erro': 'Operação não confirmada'}), 400
        
        salvar_transacoes([])
        salvar_contratos([])
        
        return jsonify({'success': True, 'mensagem': 'Todos os dados foram apagados'})
    except Exception as e:
        return jsonify({'success': False, 'erro': str(e)}), 400

# ============ INICIAR APP ============

if __name__ == '__main__':
    print("🚀 Agente Financeiro Web iniciado!")
    print("📍 Acesse no PC: http://localhost:5000")
    print("📱 Acesse no celular: http://192.168.1.37:5000")
    print("⏹️  Pressione Ctrl+C para parar")
    app.run(debug=True, host='0.0.0.0', port=5000)
