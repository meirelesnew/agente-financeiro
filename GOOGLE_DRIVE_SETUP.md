# 📁 Configuração do Google Drive - Agente Financeiro

Para integrar contratos do Google Drive no Agente Financeiro, siga estes passos:

## 1️⃣ Criar um Projeto no Google Cloud Console

1. Vá para [Google Cloud Console](https://console.cloud.google.com)
2. Clique em "Criar projeto"
3. Dê um nome ao projeto (ex: "Agente Financeiro")
4. Clique em "Criar"

## 2️⃣ Ativar a Google Drive API

1. No Console, vá para **Biblioteca de APIs**
2. Pesquise por **"Google Drive API"**
3. Clique em "Ativar"

## 3️⃣ Criar Credenciais de Conta de Serviço

1. No Console, vá para **Credenciais**
2. Clique em **"Criar Credenciais"** → **"Conta de Serviço"**
3. Preencha:
   - Nome da conta: `agente-financeiro`
   - ID: (auto-preenchido)
   - Descrição: "Acesso ao Google Drive para contratos"
4. Clique em "Criar e Continuar"
5. Clique em "Continuar" (sem atribuir funções por agora)
6. Clique em "Fazer"

## 4️⃣ Gerar Chave JSON

1. Vá para **Contas de Serviço** (no menu lateral)
2. Clique na conta que você criou
3. Vá para a aba **"Chaves"**
4. Clique em **"Adicionar Chave"** → **"Criar nova chave"** → **"JSON"**
5. Salve o arquivo `service-account-key.json` em local seguro

## 5️⃣ Compartilhar Pasta do Google Drive

1. No Google Drive, crie uma pasta chamada **"Agente-Financeiro-Contratos"**
2. Pegue o **ID da pasta** (da URL: `https://drive.google.com/drive/folders/AQUI_ESTA_O_ID`)
3. Clique com botão direito na pasta → **Compartilhar**
4. Copie o email da conta de serviço (do arquivo `service-account-key.json`)
5. Cole o email e dê acesso como "Leitor"

## 6️⃣ Configurar no Render.com

1. Acesse seu dashboard no Render.com
2. Vá para **Environment** do seu serviço
3. Adicione a variável:
   - **Nome**: `GOOGLE_CREDENTIALS_JSON`
   - **Valor**: Conteúdo completo do arquivo `service-account-key.json` (em formato JSON em uma linha)
4. Salve e redeploy seu app

## 7️⃣ Usar os Endpoints da API

### Configurar o Folder ID
```bash
POST /api/config/drive
Content-Type: application/json

{
  "folder_id": "ID_DA_SUA_PASTA_AQUI"
}
```

### Listar Contratos do Google Drive
```bash
GET /api/contratos/drive/listar?folder_id=ID_DA_SUA_PASTA_AQUI
```

### Obter Configuração Salva
```bash
GET /api/config/drive
```

## 📝 Formato dos Arquivos de Contrato

Os arquivos JSON na pasta do Google Drive devem ter este formato:

```json
{
  "cliente": "Empresa ABC",
  "titulo": "Desenvolvimento de Site",
  "valor": 5000.00,
  "vencimento": "2026-03-15",
  "whatsapp": "5511987654321",
  "email": "cliente@email.com",
  "observacao": "Projeto importante",
  "status": "pendente"
}
```

## 🔐 Segurança

- **NUNCA** compartilhe o arquivo `service-account-key.json` publicamente
- Use variáveis de ambiente no Render para armazenar credenciais
- O app só lê arquivos com permissão (não pode modificar o Drive)

## 🆘 Troubleshooting

### Erro: "folder_id não fornecido"
- Certifique-se de que o folder_id está correto na URL

### Erro: "Acesso Negado"
- Verifique se a pasta foi compartilhada com o email da conta de serviço

### Erro: "Google Drive não disponível"
- Verifique se as variáveis de ambiente estão configuradas no Render

---

**Dúvidas?** Verifique os logs do Render no dashboard!
