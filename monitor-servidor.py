#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Monitor do Agente Financeiro
Garante que o servidor está sempre rodando
Se travar, reinicia automaticamente
"""

import subprocess
import time
import os
from datetime import datetime

LOG_FILE = "servidor-monitor.log"
SERVIDOR_SCRIPT = "app_web.py"
PORTA = 5000

def log(mensagem):
    """Registra mensagem no log"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    texto = f"[{timestamp}] {mensagem}"
    print(texto)
    with open(LOG_FILE, 'a', encoding='utf-8') as f:
        f.write(texto + "\n")

def servidor_esta_rodando():
    """Verifica se servidor está rodando"""
    try:
        import socket
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        resultado = sock.connect_ex(('localhost', PORTA))
        sock.close()
        return resultado == 0
    except:
        return False

def iniciar_servidor():
    """Inicia o servidor"""
    log("Iniciando servidor...")
    try:
        subprocess.Popen(['python', SERVIDOR_SCRIPT], 
                        stdout=subprocess.DEVNULL,
                        stderr=subprocess.DEVNULL)
        time.sleep(3)  # Aguardar inicialização
        if servidor_esta_rodando():
            log("✅ Servidor iniciado com sucesso!")
            return True
        else:
            log("❌ Servidor não respondeu!")
            return False
    except Exception as e:
        log(f"❌ Erro ao iniciar: {e}")
        return False

def monitorar():
    """Monitora servidor 24/7"""
    log("=" * 60)
    log("🚀 Monitor do Agente Financeiro iniciado")
    log("=" * 60)
    
    if not servidor_esta_rodando():
        log("Servidor não está rodando, iniciando...")
        iniciar_servidor()
    
    ciclo = 0
    while True:
        try:
            ciclo += 1
            time.sleep(60)  # Verificar a cada 60 segundos
            
            if not servidor_esta_rodando():
                log("⚠️  Servidor offline! Reiniciando...")
                iniciar_servidor()
            else:
                # Log a cada 10 ciclos (10 minutos)
                if ciclo % 10 == 0:
                    log(f"✅ Servidor rodando normalmente (ciclo {ciclo})")
                    
        except KeyboardInterrupt:
            log("🛑 Monitor parado pelo usuário")
            break
        except Exception as e:
            log(f"❌ Erro no monitor: {e}")
            time.sleep(5)

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    monitorar()
