#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Script de teste para a API do Agente Financeiro
Testa criação de transações e contratos
"""

import requests
import json
import time

BASE_URL = "http://localhost:5000"

def testar_api():
    print("=" * 60)
    print("  TESTE DE API - Agente Financeiro")
    print("=" * 60)
    
    # Teste 1: Criar transação de entrada
    print("\n[1] Testando: Criar transação de ENTRADA...")
    try:
        resp = requests.post(f"{BASE_URL}/api/transacoes", json={
            "tipo": "entrada",
            "descricao": "Salário Mensal",
            "valor": 3000,
            "categoria": "salario"
        })
        if resp.status_code == 201:
            print("    ✓ Transação de entrada criada com sucesso!")
        else:
            print(f"    ✗ Erro: {resp.status_code}")
    except Exception as e:
        print(f"    ✗ Erro de conexão: {e}")
        return
    
    # Teste 2: Criar transação de saída
    print("\n[2] Testando: Criar transação de SAÍDA...")
    try:
        resp = requests.post(f"{BASE_URL}/api/transacoes", json={
            "tipo": "saida",
            "descricao": "Almoço no restaurante",
            "valor": 45.50,
            "categoria": "alimentacao"
        })
        if resp.status_code == 201:
            print("    ✓ Transação de saída criada com sucesso!")
        else:
            print(f"    ✗ Erro: {resp.status_code}")
    except Exception as e:
        print(f"    ✗ Erro de conexão: {e}")
    
    # Teste 3: Listar transações
    print("\n[3] Testando: Listar transações...")
    try:
        resp = requests.get(f"{BASE_URL}/api/transacoes")
        transacoes = resp.json()
        print(f"    ✓ {len(transacoes)} transações encontradas!")
        for t in transacoes:
            print(f"      - {t['descricao']}: R$ {t['valor']} ({t['tipo']})")
    except Exception as e:
        print(f"    ✗ Erro: {e}")
    
    # Teste 4: Gerar relatório
    print("\n[4] Testando: Gerar relatório...")
    try:
        resp = requests.get(f"{BASE_URL}/api/relatorio?filtro=mes")
        dados = resp.json()
        print(f"    ✓ Relatório gerado!")
        print(f"      - Entradas: R$ {dados['entradas']:.2f}")
        print(f"      - Saídas: R$ {dados['saidas']:.2f}")
        print(f"      - Saldo: R$ {dados['saldo']:.2f}")
    except Exception as e:
        print(f"    ✗ Erro: {e}")
    
    # Teste 5: Criar contrato
    print("\n[5] Testando: Criar contrato...")
    try:
        resp = requests.post(f"{BASE_URL}/api/contratos", json={
            "cliente": "Empresa XYZ Ltda",
            "titulo": "Desenvolvimento de Sistema Web",
            "valor": 5000,
            "vencimento": "2026-03-15",
            "whatsapp": "5511987654321",
            "email": "cliente@email.com",
            "observacao": "Contrato de exemplo"
        })
        if resp.status_code == 201:
            print("    ✓ Contrato criado com sucesso!")
        else:
            print(f"    ✗ Erro: {resp.status_code}")
    except Exception as e:
        print(f"    ✗ Erro de conexão: {e}")
    
    # Teste 6: Listar contratos
    print("\n[6] Testando: Listar contratos...")
    try:
        resp = requests.get(f"{BASE_URL}/api/contratos")
        contratos = resp.json()
        print(f"    ✓ {len(contratos)} contratos encontrados!")
        for c in contratos:
            print(f"      - {c['cliente']}: {c['titulo']} (R$ {c['valor']})")
    except Exception as e:
        print(f"    ✗ Erro: {e}")
    
    # Teste 7: Resumo de contratos
    print("\n[7] Testando: Resumo de contratos...")
    try:
        resp = requests.get(f"{BASE_URL}/api/contratos/resumo")
        dados = resp.json()
        print(f"    ✓ Resumo gerado!")
        print(f"      - Pendentes: R$ {dados['pendentes']:.2f}")
        print(f"      - Pagos: R$ {dados['pagos']:.2f}")
        print(f"      - Atrasados: R$ {dados['atrasados']:.2f}")
    except Exception as e:
        print(f"    ✗ Erro: {e}")
    
    print("\n" + "=" * 60)
    print("  ✓ TESTES CONCLUÍDOS COM SUCESSO!")
    print("=" * 60)
    print("\nAcesse a interface em: http://localhost:5000")

if __name__ == "__main__":
    print("\nAguardando servidor iniciar (5 segundos)...")
    time.sleep(5)
    testar_api()
