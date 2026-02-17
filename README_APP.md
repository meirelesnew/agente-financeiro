# 📱💰 Agente Financeiro - App Profissional

<div align="center">

![Version](https://img.shields.io/badge/version-2.0-blue)
![Python](https://img.shields.io/badge/python-3.7+-green)
![Flask](https://img.shields.io/badge/flask-3.0-lightgrey)
![PWA](https://img.shields.io/badge/PWA-Ready-purple)
![License](https://img.shields.io/badge/license-MIT-orange)

**Controle completo de finanças pessoais e empresariais**  
Instalável como app no celular | 100% Gratuito | Código Aberto

[🚀 Deploy Grátis](#-deploy-gratuito) • [📱 Instalar no Celular](#-instalar-no-celular) • [📖 Documentação](#-funcionalidades)

</div>

---

## ✨ Características

- ✅ **Controle de Contratos** - Gerencie seus contratos com clientes
- ✅ **Receitas e Despesas** - Registre entradas e saídas
- ✅ **Categorias Personalizadas** - Combustível, Mercado, Farmácia, e mais
- ✅ **Relatórios Visuais** - Veja totais por categoria e período
- ✅ **PWA - Instalável** - Funciona como app no celular
- ✅ **Funciona Offline** - Service Worker para cache
- ✅ **100% Responsivo** - Desktop, tablet e mobile
- ✅ **Interface Profissional** - Design moderno Google Material
- ✅ **Backup/Export** - Exporte seus dados em JSON
- ✅ **100% Gratuito** - Deploy grátis no Render.com

---

## 🎯 Quem Pode Usar?

- 💼 **Freelancers** - Controle de contratos e pagamentos
- 🏢 **Pequenas Empresas** - Gestão financeira simples
- 👤 **Pessoas Físicas** - Controle pessoal de gastos
- 📊 **Contadores** - Ferramenta auxiliar para clientes
- 👨‍👩‍👧 **Famílias** - Orçamento doméstico

---

## 🚀 Deploy Gratuito

### Render.com (Recomendado - 5 minutos)

1. **Faça fork** deste repositório
2. **Crie conta grátis** em [Render.com](https://render.com)
3. **Conecte seu GitHub** no Render
4. **Crie novo Web Service:**
   - Repository: seu fork
   - Build: `pip install -r requirements.txt`
   - Start: `gunicorn app_web:app --bind 0.0.0.0:$PORT`
5. **Deploy!** 🎉

Seu app estará disponível em: `https://seu-app.onrender.com`

**Veja tutorial completo:** [DEPLOY.md](DEPLOY.md)

### Outras Opções Gratuitas

- **Railway.app** - Deploy com 1 clique
- **Vercel** - Para versão serverless
- **Heroku** - Clássico (requer cartão)

---

## 📱 Instalar no Celular

### Android

1. Abra `https://seu-app.onrender.com` no **Chrome**
2. Toque no menu (⋮)
3. Selecione **"Adicionar à tela inicial"** ou **"Instalar app"**
4. Confirme
5. ✅ Pronto! App instalado

### iPhone/iPad

1. Abra no **Safari**
2. Toque no botão **Compartilhar** (□↑)
3. Role e toque em **"Adicionar à Tela de Início"**
4. Confirme
5. ✅ Pronto! App instalado

O app funcionará **offline** e terá **ícone na tela inicial**!

---

## 💡 Funcionalidades

### 📊 Gestão de Transações

**Categorias de Entrada:**
- 📑 Contratos
- 💼 Salário
- 🚀 Projetos
- ⚙️ Serviços

**Categorias de Saída:**
- ⛽ Combustível
- 🛒 Mercado
- 💊 Farmácia
- 🍔 Alimentação
- 🚗 Transporte
- 🏠 Moradia
- 🎮 Lazer
- 🏥 Saúde

### 📋 Gestão de Contratos

- Cadastro completo de clientes
- Status: Pendente, Pago, Atrasado
- Valores e vencimentos
- WhatsApp e Email
- Observações e notas

### 📈 Relatórios

- Totais por categoria
- Filtros por período
- Saldo atual
- Histórico completo

### 💾 Dados e Backup

- Exportar tudo em JSON
- Importar dados
- Dados salvos localmente
- Sincronização opcional com Google Drive

---

## 🛠️ Desenvolvimento Local

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/agente-financeiro.git
cd agente-financeiro

# Instale as dependências
pip install -r requirements.txt

# Execute o servidor
python app_web.py

# Abra no navegador
http://localhost:5000
```

### Estrutura do Projeto

```
agente-financeiro/
├── app_web.py              # Backend Flask + APIs
├── requirements.txt        # Dependências Python
├── templates/
│   └── index.html          # Interface Web (PWA)
├── static/
│   ├── manifest.json       # Config PWA
│   └── service-worker.js   # Cache offline
├── dados/                  # Arquivos JSON (dados)
├── DEPLOY.md              # Guia de deploy
└── README.md              # Este arquivo
```

---

## 🌟 Compartilhar com Outras Pessoas

### Opção 1: Link Direto
```
Compartilhe: https://seu-app.onrender.com
```

### Opção 2: Fork e Deploy
1. Outras pessoas fazem fork do repositório
2. Fazem seu próprio deploy no Render (grátis)
3. Têm versão personalizada!

### Opção 3: Código Aberto
- Clone o repositório
- Customize como quiser
- Redistribua (licença MIT)

---

## 🔐 Segurança e Privacidade

⚠️ **Importante:**

- ✅ Dados salvos localmente (browser/servidor)
- ✅ Nenhum dado é enviado para terceiros
- ⚠️ Para uso multi-usuário, adicione autenticação
- ⚠️ Para produção, use banco de dados

### Melhorias Futuras (Roadmap)

- [ ] Sistema de login/autenticação
- [ ] Banco de dados PostgreSQL
- [ ] Múltiplos usuários
- [ ] API REST completa
- [ ] Gráficos interativos (Chart.js)
- [ ] Modo escuro
- [ ] Notificações push
- [ ] Sincronização em nuvem
- [ ] Backup automático
- [ ] Relatórios em PDF
- [ ] Integração WhatsApp Business
- [ ] App nativo (React Native/Flutter)

---

## 🤝 Como Contribuir

1. Faça fork do projeto
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

**Isso significa:**
- ✅ Uso comercial permitido
- ✅ Modificação permitida
- ✅ Distribuição permitida
- ✅ Uso privado permitido

---

## 📞 Suporte e Contato

- 🐛 **Bugs:** Abra uma [Issue](https://github.com/seu-usuario/agente-financeiro/issues)
- 💡 **Ideias:** Compartilhe nas [Discussions](https://github.com/seu-usuario/agente-financeiro/discussions)
- 📧 **Contato:** Através do GitHub

---

## 🎉 Agradecimentos

Feito com ❤️ para ajudar pessoas e empresas a terem melhor controle financeiro.

**Tecnologias Utilizadas:**
- Python 3 + Flask
- HTML5 + CSS3 + JavaScript
- Google Fonts (Inter)
- PWA (Progressive Web App)
- Service Workers
- Material Design

---

<div align="center">

**Se este projeto te ajudou, deixe uma ⭐ no GitHub!**

[⬆ Voltar ao topo](#-agente-financeiro---app-profissional)

</div>
