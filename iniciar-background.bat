@echo off
REM ============================================
REM  Agente Financeiro - Rodar em Background
REM  Este arquivo inicia o servidor sem janela
REM ============================================

cd c:\Users\meire\agente-financeiro

REM Iniciar Python em background (sem janela visível)
start /B python app_web.py

REM Salvar o processo ID
echo %date% %time% - Servidor iniciado >> servidor.log

REM Manter a janela aberta se houver erro
pause
