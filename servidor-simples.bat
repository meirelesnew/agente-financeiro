@echo off
REM ============================================
REM  Servidor de arquivo HTML simples
REM ============================================

cd c:\Users\meire\agente-financeiro

echo.
echo  ╔════════════════════════════════════════════╗
echo  ║  💰 AGENTE FINANCEIRO - Versão Simples   ║
echo  ╚════════════════════════════════════════════╝
echo.
echo  Servidor iniciando...
echo.

python -m http.server 8000

echo.
echo  Acesse: http://localhost:8000/app-simples.html
echo.
