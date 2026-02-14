@echo off
REM ============================================
REM  Agente Financeiro - Iniciar Servidor
REM ============================================
echo.
echo  ╔════════════════════════════════════════════╗
echo  ║  💰 AGENTE FINANCEIRO - Versão Python    ║
echo  ║  Sistema de Controle Financeiro Web      ║
echo  ╚════════════════════════════════════════════╝
echo.

REM Verificar se Python está instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python não foi encontrado!
    echo Instale Python de: https://www.python.org/downloads/
    pause
    exit /b 1
)

REM Verificar e instalar dependências
echo.
echo 📦 Verificando dependências...
pip install -q -r requirements.txt
if errorlevel 1 (
    echo ❌ Erro ao instalar dependências
    pause
    exit /b 1
)

echo ✅ Dependências instaladas!
echo.
echo 🚀 Iniciando servidor...
echo.
echo 📍 Acesse: http://localhost:5000
echo ⏹️  Pressione Ctrl+C para parar
echo.

REM Iniciar aplicação
python app_web.py
