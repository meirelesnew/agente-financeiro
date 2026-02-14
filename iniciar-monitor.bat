@echo off
REM ============================================
REM  Monitor do Servidor - Com Restart Auto
REM ============================================

echo.
echo  ╔════════════════════════════════════════════╗
echo  ║  📊 MONITOR DO SERVIDOR                   ║
echo  ║     Verifica a cada 60 segundos           ║
echo  ║     Se travar, reinicia automaticamente   ║
echo  ╚════════════════════════════════════════════╝
echo.

cd c:\Users\meire\agente-financeiro

REM Iniciar monitor
python monitor-servidor.py

REM Se fechou, perguntar se quer reiniciar
echo.
echo  Monitor encerrado!
echo.
pause
