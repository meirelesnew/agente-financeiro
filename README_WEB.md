# 💰 Agente Financeiro - Versão Python Web

Um sistema completo de controle financeiro com **Python + Flask**, desenvolvido para ser prático e fácil de usar!

## ✨ Características

✅ **Transações** - Registre entradas e saídas com categorias  
✅ **Relatórios** - Visualize totais por categoria e período  
✅ **Contratos** - Gerencie contratos com clientes  
✅ **Backup** - Exporte seus dados em JSON  
✅ **Interface Moderna** - UI responsiva e intuitiva  
✅ **100% Offline** - Dados salvos localmente em JSON  

## 🚀 Como Usar

### Opção 1: Clique Duplo (Mais Fácil)

1. Vá até a pasta do projeto
2. Dê duplo clique em **`iniciar.bat`**
3. Pronto! Abra seu navegador em http://localhost:5000

### Opção 2: Terminal Manual

```bash
# 1. Instalar dependências (primeira vez)
pip install -r requirements.txt

# 2. Executar
python app_web.py

# 3. Abrir navegador
# Acesse: http://localhost:5000
```

## 📁 Estrutura do Projeto

```
agente-financeiro/
├── app_web.py              # Backend Flask (API)
├── requirements.txt        # Dependências Python
├── iniciar.bat             # Atalho para iniciar (Windows)
├── templates/
│   └── index.html          # Interface Web
└── dados/                  # Pasta com dados (criada automaticamente)
    ├── transacoes.json
    └── contratos.json
```

## 🎯 Funcionalidades Detalhadas

### 📊 Transações
- ➕ Adicionar entrada/saída
- 🗂️ Organizar por categoria (Salário, Alimentação, Transporte, etc)
- 📈 Visualizar totais e saldo
- 🗑️ Deletar transações
- 📅 Histórico com datas

### 📈 Relatórios
- Filtrar por mês ou todo período
- Visualizar por categoria
- Ver totais de entradas, saídas e saldo

### 📋 Contratos
- ➕ Criar contratos com clientes
- 📅 Controlar prazos e vencimentos
- ⚠️ Alertar automáticamente atrasados
- 💾 Marcar como pago
- 📱 Integração com WhatsApp e E-mail (futura)

### 💾 Backup & Dados
- 📥 Exportar backup completo em JSON
- 🗑️ Limpar todos os dados (com confirmação)

## 🔧 Requisitos

- **Python 3.7+** (Instale de https://www.python.org/downloads/)
- **Flask 3.0** (instalado automaticamente via `requirements.txt`)

## 📱 Responsividade

A aplicação funciona em:
- 💻 Desktop (Chrome, Firefox, Edge)
- 📱 Celular (Safari iOS, Chrome Android)
- 🖥️ Tablet

## 💾 Onde os Dados são Salvos?

Os dados são salvos em **JSON** na pasta `dados/` do projeto:
- `dados/transacoes.json` - Todas as transações
- `dados/contratos.json` - Todos os contratos

Você pode fazer backup desses arquivos onde quiser!

## 🐛 Solução de Problemas

### "Porta 5000 já está em uso"
```bash
# Use uma porta diferente
python -c "from app_web import app; app.run(port=5001)"
```

### "ModuleNotFoundError: No module named 'flask'"
```bash
# Instale as dependências
pip install -r requirements.txt
```

### "Python não encontrado"
- Instale Python de: https://www.python.org/downloads/
- Marque "Add Python to PATH" durante instalação

## 📊 Exemplo de Uso

1. **Acesse** http://localhost:5000
2. **Seção Transações**: Adicione suas entradas e saídas
3. **Seção Relatórios**: Veja resumo e totais por categoria
4. **Seção Contratos**: Crie e acompanhe seus contratos
5. **Backup**: Exporte seus dados regularmente

## 🎨 Personalização

Quer mudar cores ou design? Edite o CSS no arquivo `templates/index.html`

Quer adicionar novos campos? Modifique `app_web.py` e `templates/index.html`

## 📞 Próximas Melhorias

- [ ] Integração com WhatsApp para cobrança automática
- [ ] Envio de e-mail automático
- [ ] Gráficos de visualização
- [ ] Multi-usuário com login
- [ ] Sincronização em nuvem

## 📄 Licença

Uso livre! Faça o que quiser com esse código.

---

**Desenvolvido com ❤️ em Python + Flask**

Para dúvidas ou sugestões, fique à vontade para explorar o código!
