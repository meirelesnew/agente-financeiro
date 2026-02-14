@echo off
REM ============================================
REM  Obter IP e instruções para celular
REM ============================================

echo.
echo  ╔════════════════════════════════════════════╗
echo  ║  📱 ACESSAR NO CELULAR                    ║
echo  ║  Agente Financeiro - Mobile               ║
echo  ╚════════════════════════════════════════════╝
echo.

REM Obter IP
for /f "tokens=2 delims=:" %%A in ('ipconfig ^| findstr /C:"IPv4"') do (
    set IP=%%A
    goto found
)

:found
REM Remover espaços
for /f "tokens=*" %%A in ('echo %IP%') do set IP=%%A

echo.
echo  ✅ Seu IP: %IP%
echo.
echo  📍 Acesse no celular:
echo.
echo     http://%IP%:5000
echo.
echo  ══════════════════════════════════════════
echo.
echo  ✓ Certifique-se que:
echo    - PC e celular estão NA MESMA WI-FI
echo    - Servidor Flask está rodando
echo    - Firewall permite porta 5000
echo.
echo  💡 Dica: Abra este link no celular:
echo     http://%IP%:5000
echo.
echo  ⏱️  Aguarde alguns segundos para carregar
echo.
pause
