# 🚀 GUIA RÁPIDO - Agente Financeiro Web (Python)

## ⚡ Iniciar em 3 Passos

### Passo 1: Abrir o Atalho
```
Duplo clique em: iniciar.bat
```

### Passo 2: Aguardar o Servidor
Você verá na tela:
```
🚀 Agente Financeiro Web iniciado!
📍 Acesse: http://localhost:5000
```

### Passo 3: Abrir no Navegador
Acesse: **http://localhost:5000**

---

## 📚 Interface Principal

Você verá **3 abas**:

### 📊 **Aba 1: Transações**
- Adicionar entradas (💵 dinheiro que você recebe)
- Adicionar saídas (💸 dinheiro que você gasta)
- Ver saldo total
- Ver histórico
- Fazer backup dos dados

### 📈 **Aba 2: Relatórios**
- Ver totais do mês ou todo período
- Visualizar gastos por categoria
- Análise de entradas vs saídas

### 📋 **Aba 3: Contratos**
- Criar contratos com clientes
- Rastrear prazos
- Ver quais estão pendentes, pagos ou atrasados
- Marcar como pago

---

## 💡 Exemplo de Uso

**Você é freelancer e quer controlar seus ganhos:**

1. **Aba Transações** → Adicione uma entrada de R$ 3.000 (Salário/Projeto)
2. **Aba Transações** → Adicione uma saída de R$ 500 (Alimentação)
3. **Aba Relatórios** → Veja seu saldo: R$ 2.500
4. **Aba Contratos** → Crie um contrato com o cliente
5. **Aba Contratos** → Quando receber, marque como pago
6. **Aba Transações** → Faça backup clicando em "📥 Fazer Backup"

---

## ⚙️ Parar o Servidor

Pressione: **Ctrl + C** no terminal

---

## 🔧 Troubleshooting

### "A porta 5000 já está em uso"
Feche outros programas usando a porta ou use:
```bash
python app_web.py --port 5001
```

### "ModuleNotFoundError: flask"
```bash
python -m pip install flask
```

### "A página não carrega"
- Verifique se o servidor está rodando
- Tente refresh (F5) no navegador
- Tente outro navegador

---

## 📂 Onde Ficam Meus Dados?

Todos os dados são salvos em:
```
agente-financeiro/dados/
├── transacoes.json
└── contratos.json
```

**Você pode fazer backup desses arquivos a qualquer momento!**

---

## 🎯 Próximas Features

- WhatsApp integrado para cobranças
- Gráficos de visualização
- Importação de dados
- Sincronização em nuvem

---

**Desenvolvido com ❤️ em Python + Flask**

Qualquer dúvida, explore o arquivo `README_WEB.md` para mais detalhes!
