# 📱 Agente Financeiro - Guia de Deploy e Instalação

## 🚀 Como Rodar Online (GRÁTIS)

### Opção 1: Render.com (Recomendado) ⭐

1. **Criar conta no Render** (gratuito): https://render.com
2. **Conectar seu repositório GitHub**
3. **Criar novo Web Service**:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app_web:app --bind 0.0.0.0:$PORT`
4. **Configurar variáveis de ambiente** (opcional):
   - `GOOGLE_CREDENTIALS_JSON` - Para integração Google Drive
5. **Deploy automático** - Pronto! 🎉

**URL gerada**: `https://seu-app.onrender.com`

### Opção 2: Railway.app

1. Acesse: https://railway.app
2. Importe do GitHub
3. Deploy automático!

### Opção 3: Heroku (Requer cartão de crédito, mas grátis)

1. Crie conta: https://heroku.com
2. Instale Heroku CLI
3. ```bash
   heroku create seu-app
   git push heroku main
   ```

---

## 📱 Instalar como APP no Celular

### Android:

1. **Abra o site** no Chrome
2. **Toque no menu** (3 pontos)
3. **"Adicionar à tela inicial"** ou **"Instalar app"**
4. **Pronto!** App instalado 📲

### iPhone/iPad:

1. **Abra o site** no Safari
2. **Toque no botão Compartilhar** (quadrado com seta)
3. **"Adicionar à Tela de Início"**
4. **Confirme**
5. **Pronto!** App instalado 📲

---

## 🌐 URLs do Projeto

- **Local**: http://localhost:5000
- **Render**: https://agente-financeiro.onrender.com (após deploy)

---

## 💡 Compartilhar com Outras Pessoas

### Forma 1: Link Direto
Compartilhe o link do seu app no Render:
```
https://seu-app.onrender.com
```

### Forma 2: Fork do Repositório
Qualquer pessoa pode:
1. Fazer fork do seu repositório no GitHub
2. Fazer deploy no Render (de graça)
3. Ter sua própria versão!

### Forma 3: App Instalável (PWA)
- Cada pessoa acessa o link
- Instala como app no celular
- Funciona offline!

---

## 🔐 Segurança e Privacidade

⚠️ **IMPORTANTE**: 
- Os dados ficam salvos localmente no navegador/app
- No Render, os dados ficam em arquivos JSON no servidor
- Para produção com múltiplos usuários, recomenda-se usar banco de dados

### Próximos Passos para Produção:
- [ ] Adicionar sistema de login/autenticação
- [ ] Usar banco de dados (PostgreSQL no Render é grátis)
- [ ] Adicionar criptografia de dados sensíveis
- [ ] Implementar backups automáticos

---

## 📦 Estrutura do Projeto

```
agente-financeiro/
├── app_web.py              # Backend Flask
├── requirements.txt        # Dependências Python
├── templates/
│   └── index.html          # Interface Web (PWA Ready)
├── static/
│   ├── manifest.json       # Configuração PWA
│   └── service-worker.js   # Cache offline
└── dados/                  # Dados salvos (JSON)
```

---

## 🛠️ Desenvolvimento Local

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/agente-financeiro.git
cd agente-financeiro

# 2. Instale dependências
pip install -r requirements.txt

# 3. Execute
python app_web.py

# 4. Acesse
http://localhost:5000
```

---

## ❓ Perguntas Frequentes

### Como funciona offline?
O PWA usa Service Worker para cachear a interface. Os dados são salvos no navegador (LocalStorage) ou no servidor.

### É realmente grátis?
Sim! Render.com oferece plano gratuito para apps simples. Pode ter algumas limitações de uso.

### Posso usar em produção?
Sim, mas recomenda-se adicionar autenticação e banco de dados para múltiplos usuários.

### Como atualizar o app?
No Render, basta fazer push no GitHub. Deploy automático!

---

## 📞 Suporte

- Abra uma Issue no GitHub
- Documentação: Ver README.md principal

---

**Desenvolvido com ❤️ para ajudar no controle financeiro**
