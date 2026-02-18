@echo off
REM ============================================
REM  Agente Financeiro - Instalador de Serviço
REM  Transforma o app em serviço Windows
REM ============================================

echo.
echo  ╔════════════════════════════════════════════╗
echo  ║  🔧 INSTALAR COMO SERVIÇO WINDOWS         ║
echo  ║     Rodará 24/7 automaticamente            ║
echo  ╚════════════════════════════════════════════╝
echo.

REM Verificar privilégios admin
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo  ❌ Este script precisa ser executado como ADMINISTRADOR!
    echo.
    echo  Clique direito em agendar-servico.bat
    echo  e escolha "Executar como administrador"
    echo.
    pause
    exit /b 1
)

echo  ✅ Executando como administrador
echo.
echo  Escolha uma opção:
echo.
echo  [1] Instalar como Serviço (Recomendado)
echo  [2] Usar Task Scheduler (Simples)
echo  [3] Rodar em Background (Básico)
echo.
set /p opcao="Digite [1], [2] ou [3]: "

if "%opcao%"=="1" goto instalar_servico
if "%opcao%"=="2" goto task_scheduler
if "%opcao%"=="3" goto background
goto fim

:instalar_servico
echo.
echo  [Opção 1] Instalando como Serviço...
echo.

REM Verificar se NSSM está instalado
if not exist "c:\nssm\nssm.exe" (
    echo  ⚠️  NSSM não encontrado!
    echo.
    echo  Você pode instalar NSSM em:
    echo  https://nssm.cc/download
    echo.
    echo  Depois coloque em: c:\nssm\nssm.exe
    echo.
    pause
    exit /b 1
)

REM Instalar serviço com NSSM
c:\nssm\nssm.exe install AgenteFinanceiro "c:\Python313\python.exe" "c:\Users\meire\agente-financeiro\app_web.py"
c:\nssm\nssm.exe set AgenteFinanceiro AppDirectory "c:\Users\meire\agente-financeiro"

echo.
echo  ✅ Serviço instalado!
echo.
echo  Começar agora:
echo     net start AgenteFinanceiro
echo.
echo  Parar:
echo     net stop AgenteFinanceiro
echo.
echo  Remover:
echo     c:\nssm\nssm.exe remove AgenteFinanceiro confirm
echo.
pause
goto fim

:task_scheduler
echo.
echo  [Opção 2] Configurando Task Scheduler...
echo.

REM Remover tarefa antiga
schtasks /delete /tn "AgenteFinanceiro" /f 2>nul

REM Criar tarefa para iniciar no boot
schtasks /create /tn "AgenteFinanceiro" /tr "python c:\Users\meire\agente-financeiro\app_web.py" /sc onstart /ru %USERNAME% /f

echo.
echo  ✅ Task Scheduler configurado!
echo.
echo  O servidor vai iniciar automaticamente no próximo boot
echo.
pause
goto fim

:background
echo.
echo  [Opção 3] Iniciando em Background...
echo.

cd c:\Users\meire\agente-financeiro
start /B pythonw app_web.py

echo.
echo  ✅ Servidor iniciado em background!
echo.
echo  Ele não vai desaparecer quando você fechar o terminal
echo  Acesse: http://localhost:5000
echo.
pause
goto fim

:fim
echo.
echo  Processo concluído!
echo.
