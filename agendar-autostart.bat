@echo off
REM ============================================
REM  Agente Financeiro - Task Scheduler Setup
REM  Agendar execução automática (Windows)
REM ============================================

echo.
echo  ╔════════════════════════════════════════════╗
echo  ║  📅 CONFIGURAR INICIALIZAÇÃO AUTOMÁTICA   ║
echo  ╚════════════════════════════════════════════╝
echo.

REM Criar tarefa agendada
echo [!] Criando tarefa agendada...
echo.

REM Remover tarefa antiga se existir
schtasks /delete /tn "AgenteFinanceiro" /f 2>nul

REM Criar nova tarefa para iniciar no boot
schtasks /create /tn "AgenteFinanceiro" /tr "python c:\Users\meire\agente-financeiro\app_web.py" /sc onstart /ru %USERNAME% /f

echo.
echo  ✅ Tarefa criada!
echo.
echo  O servidor agora vai:
echo  ✓ Iniciar automaticamente quando você ligar o PC
echo  ✓ Continuar rodando em background
echo  ✓ Estar acessível em http://localhost:5000
echo.
echo  Para acessar no celular:
echo  http://192.168.1.37:5000
echo.
pause
