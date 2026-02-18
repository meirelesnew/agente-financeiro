# 🎯 Guia de Uso - Agente Financeiro Online

## ✅ Status Atual
- ✅ Aplicação online no Render.com
- ✅ Botões de entrada e saída funcionando
- ✅ Google Drive integrado para importar contratos
- ✅ Dashboard com relatórios
- ✅ HTTPS seguro

---

## 📊 Seção 1: Transações

### Adicionar Entrada
1. Na aba **📊 Transações**
2. Clique no botão verde **"Entrada"**
3. Preencha:
   - **Descrição**: Ex: "Salário de Janeiro"
   - **Valor**: Ex: 5000
   - **Categoria**: Escolha entre as opções
4. Clique em **"Adicionar Transação"**

### Adicionar Saída
1. Clique no botão vermelho **"Saída"**
2. Preencha:
   - **Descrição**: Ex: "Aluguel"
   - **Valor**: Ex: 1500
   - **Categoria**: Escolha entre as opções
3. Clique em **"Adicionar Transação"**

### Deletar Transação
- Cada transação tem um botão 🗑️ para deletar
- Clique e confirme a exclusão

---

## 📈 Seção 2: Relatórios

### Visualizar Relatório
1. Vá para a aba **📈 Relatórios**
2. Clique em **"Mês"** ou **"Todos"** para filtrar o período
3. Veja o resumo:
   - **Total de Entradas**: Soma de tudo que entrou
   - **Total de Saídas**: Soma de tudo que saiu
   - **Saldo**: Diferença entre entradas e saídas
4. **Por Categoria**: Visualize quanto está gastando em cada categoria

---

## 📋 Seção 3: Contratos

### Adicionar Contrato Manual
1. Na aba **📋 Contratos**
2. Preencha o formulário:
   - **Cliente/Empresa**: Ex: "Empresa ABC"
   - **Título do Serviço**: Ex: "Desenvolvimento de Site"
   - **Valor**: Ex: 5000
   - **Vencimento**: Data de vencimento
   - **WhatsApp** (opcional): Número do cliente
   - **Email** (opcional): Email do cliente
   - **Observações**: Detalhes importantes
3. Clique em **"Adicionar Contrato"**

### Filtrar Contratos
- **Todos**: Mostra todos os contratos
- **Pendentes**: Contratos não pagos
- **Pagos**: Contratos já pagos
- **Atrasados**: Contratos vencidos e não pagos

### Marcar como Pago
1. Encontre o contrato na lista
2. Clique em **"✅ Marcar como Pago"**

### Deletar Contrato
1. Encontre o contrato
2. Clique em **"🗑️ Deletar"**
3. Confirme a exclusão

---

## ☁️ Seção 4: Google Drive (Novo!)

### Configurar Google Drive

#### Passo 1: Obter o ID da Pasta
1. Abra o Google Drive
2. Crie uma pasta chamada **"Agente-Financeiro-Contratos"**
3. Abra a pasta
4. Copie o ID da URL (após `/folders/`)
   - Exemplo URL: `https://drive.google.com/drive/folders/1a2b3c4d5e6f`
   - ID: `1a2b3c4d5e6f`

#### Passo 2: Configurar no App
1. Na aba **☁️ Google Drive**
2. Cole o ID da pasta no campo **"ID da Pasta no Google Drive"**
3. Clique em **"💾 Salvar Configuração"**

### Importar Contratos do Google Drive

#### Formato dos Arquivos JSON
Crie arquivos `.json` na pasta do Google Drive com este formato:

```json
{
  "cliente": "Empresa XYZ",
  "titulo": "Consultoria de TI",
  "valor": 3500.00,
  "vencimento": "2026-03-20",
  "whatsapp": "5511987654321",
  "email": "contato@empresa.com",
  "observacao": "Primeira parcela",
  "status": "pendente"
}
```

#### Importar os Contratos
1. Coloque os arquivos JSON na pasta do Google Drive
2. Volta ao app na aba **☁️ Google Drive**
3. Clique em **"📥 Importar do Google Drive"**
4. Os contratos aparecerão na lista abaixo

---

## 📥 Ações Globais

### Fazer Backup
1. Clique em **"💾 Fazer Backup"**
2. Um arquivo `.json` será baixado com todos os seus dados
3. Guarde em local seguro!

### Limpar Todos os Dados
⚠️ **CUIDADO!** Isso deleta TUDO!
1. Clique em **"🗑️ Limpar Tudo"**
2. Confirme duas vezes

---

## 🔍 Dicas Úteis

### Categorias Disponíveis
- Geral
- Salário
- Alimentação
- Transporte
- Moradia
- Lazer
- Saúde
- Outros

### Cores Significam
- 🟢 **Verde**: Entradas e Pagos
- 🔴 **Vermelho**: Saídas e Atrasados
- 🟠 **Laranja**: Pendentes
- 🔵 **Azul**: Saldo

### Formatos
- **Moeda**: Sempre em Real (R$)
- **Data**: DD/MM/AAAA
- **Telefone**: Com DDD (Ex: 5511987654321)

---

## ⚠️ Troubleshooting

### Os botões não funcionam?
- Recarregue a página (F5)
- Limpe o cache do navegador
- Tente em outro navegador

### Não consegue importar do Google Drive?
1. Verifique o ID da pasta
2. Certifique-se de ter criado os arquivos `.json`
3. Verifique se os arquivos têm o formato correto

### Dados desapareceram após reiniciar?
- Os dados são armazenados em arquivo JSON local
- Se reiniciar a aplicação no Render, os dados são mantidos
- Faça backup regularmente!

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique os logs do Render.com
2. Acesse https://agente-financeiro.onrender.com
3. Abra o console do navegador (F12) para ver erros

---

**Última atualização**: Fevereiro de 2026
**Versão**: 2.0 com Google Drive
