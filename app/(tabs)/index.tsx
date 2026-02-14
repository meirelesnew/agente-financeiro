import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  CATEGORIAS,
  clearLancamentos,
  loadLancamentos,
  saveLancamentos,
  type Categoria,
  type Lancamento,
  type Tipo,
} from "../../services/storage";

export default function Home() {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState<Tipo>("Saída");
  const [categoria, setCategoria] = useState<Categoria>("Carro");
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);
  const [carregando, setCarregando] = useState(true);

  // Carrega ao abrir
  useEffect(() => {
    (async () => {
      try {
        const list = await loadLancamentos();
        setLancamentos(list);
      } finally {
        setCarregando(false);
      }
    })();
  }, []);

  // Salva sempre que mudar (após carregar)
  useEffect(() => {
    if (carregando) return;
    saveLancamentos(lancamentos);
  }, [lancamentos, carregando]);

  const resumo = useMemo(() => {
    const entradas = lancamentos
      .filter((l) => l.tipo === "Entrada")
      .reduce((s, l) => s + l.valor, 0);

    const saidasAbs = Math.abs(
      lancamentos
        .filter((l) => l.tipo === "Saída")
        .reduce((s, l) => s + l.valor, 0)
    );

    const saldo = entradas - saidasAbs;
    return { entradas, saidas: saidasAbs, saldo };
  }, [lancamentos]);

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

  function salvar() {
    const v = Number(String(valor).replace(",", "."));

    if (!descricao.trim()) {
      Alert.alert("Atenção", "Digite uma descrição.");
      return;
    }
    if (Number.isNaN(v) || v <= 0) {
      Alert.alert("Atenção", "Digite um valor válido (maior que zero).");
      return;
    }

    const valorFinal = tipo === "Saída" ? -Math.abs(v) : Math.abs(v);

    const novo: Lancamento = {
      id: String(Date.now()),
      dataISO: new Date().toISOString(),
      categoria,
      descricao: descricao.trim(),
      tipo,
      valor: valorFinal,
    };

    setLancamentos((prev) => [novo, ...prev]);
    setDescricao("");
    setValor("");
  }

  function confirmarLimparTudo() {
    Alert.alert(
      "Limpar tudo",
      "Isso vai apagar todos os lançamentos salvos no celular. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Apagar", style: "destructive", onPress: limparTudo },
      ]
    );
  }

  async function limparTudo() {
    setLancamentos([]);
    await clearLancamentos();
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Agente Financeiro</Text>

        <Pressable onPress={confirmarLimparTudo} style={styles.clearBtn}>
          <Text style={styles.clearBtnText}>Limpar tudo</Text>
        </Pressable>
      </View>

      {/* Resumo */}
      <View style={styles.cards}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Entradas</Text>
          <Text style={styles.cardValue}>{formatCurrency(resumo.entradas)}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Saídas</Text>
          <Text style={styles.cardValue}>{formatCurrency(resumo.saidas)}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Saldo</Text>
          <Text style={styles.cardValue}>{formatCurrency(resumo.saldo)}</Text>
        </View>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Ex: Internet, gasolina, mercado..."
          placeholderTextColor="#94a3b8"
          style={styles.input}
        />

        <Text style={styles.label}>Valor (R$)</Text>
        <TextInput
          value={valor}
          onChangeText={setValor}
          keyboardType="numeric"
          placeholder="Ex: 70,00"
          placeholderTextColor="#94a3b8"
          style={styles.input}
        />

        <Text style={styles.label}>Tipo</Text>
        <View style={styles.row}>
          <Pressable
            onPress={() => setTipo("Entrada")}
            style={[styles.pill, tipo === "Entrada" && styles.pillOnBlue]}
          >
            <Text style={styles.pillText}>Entrada</Text>
          </Pressable>

          <Pressable
            onPress={() => setTipo("Saída")}
            style={[styles.pill, tipo === "Saída" && styles.pillOnRed]}
          >
            <Text style={styles.pillText}>Saída</Text>
          </Pressable>
        </View>

        <Text style={styles.label}>Categoria (toque para escolher)</Text>
        <FlatList
          horizontal
          data={[...CATEGORIAS]}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setCategoria(item)}
              style={[styles.cat, categoria === item && styles.catOn]}
            >
              <Text style={styles.catText}>{item}</Text>
            </Pressable>
          )}
        />

        <Pressable onPress={salvar} style={styles.btn}>
          <Text style={styles.btnText}>Salvar lançamento</Text>
        </Pressable>

        <Text style={styles.hint}>
          Dica: valor sempre positivo (o app aplica Entrada/Saída).
        </Text>
      </View>

      {/* Lista */}
      <Text style={styles.section}>Lançamentos</Text>
      <FlatList
        data={lancamentos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const dataFmt = new Date(item.dataISO).toLocaleDateString("pt-BR");
          return (
            <View style={styles.item}>
              <View style={styles.itemTopRow}>
                <Text style={styles.itemTop}>{dataFmt} • {item.categoria}</Text>
                <View style={[styles.typePill, item.tipo === 'Entrada' ? styles.typeIn : styles.typeOut]}>
                  <Text style={styles.typePillText}>{item.tipo}</Text>
                </View>
              </View>

              <Text style={styles.itemDesc}>{item.descricao}</Text>
              <Text style={[styles.itemVal, item.tipo === 'Entrada' ? styles.valIn : styles.valOut]}>{formatCurrency(item.valor)}</Text>
            </View>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {carregando ? "Carregando..." : "Ainda sem lançamentos."}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1220",
    padding: 16,
    paddingTop: 48,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  title: { color: "#e2e8f0", fontSize: 22, fontWeight: "800" },

  clearBtn: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "#111a2e",
  },
  clearBtnText: { color: "#94a3b8", fontWeight: "800", fontSize: 12 },

  cards: { flexDirection: "row", gap: 8, marginBottom: 14 },
  card: {
    flex: 1,
    backgroundColor: "#111a2e",
    borderRadius: 14,
    padding: 10,
  },
  cardLabel: { color: "#94a3b8", fontSize: 12 },
  cardValue: {
    color: "#e2e8f0",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 4,
  },

  form: {
    backgroundColor: "#111a2e",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  label: {
    color: "#cbd5e1",
    marginTop: 10,
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#0b1220",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#e2e8f0",
  },

  row: { flexDirection: "row", gap: 10, marginTop: 4 },
  pill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#0b1220",
    alignItems: "center",
  },
  pillOnBlue: { backgroundColor: "#1d4ed8" },
  pillOnRed: { backgroundColor: "#b91c1c" },
  pillText: { color: "#e2e8f0", fontWeight: "800" },

  cat: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "#0b1220",
    marginRight: 8,
  },
  catOn: { backgroundColor: "#16a34a" },
  catText: { color: "#e2e8f0", fontWeight: "700" },

  btn: {
    marginTop: 12,
    backgroundColor: "#22c55e",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  btnText: { color: "#06220f", fontWeight: "900" },
  hint: { color: "#94a3b8", marginTop: 10, fontSize: 12 },

  section: {
    color: "#e2e8f0",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 6,
    marginBottom: 6,
  },
  item: {
    backgroundColor: "#111a2e",
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
  },
  itemTop: { color: "#94a3b8", fontSize: 12, fontWeight: "700" },
  itemDesc: { color: "#e2e8f0", fontSize: 14, marginTop: 4 },
  itemVal: { color: "#e2e8f0", fontSize: 14, fontWeight: "900", marginTop: 6 },
  itemTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  typePill: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 10 },
  typePillText: { color: "#e2e8f0", fontWeight: "800", fontSize: 12 },
  typeIn: { backgroundColor: "#064e3b" },
  typeOut: { backgroundColor: "#6b021f" },
  valIn: { color: "#34d399" },
  valOut: { color: "#f87171" },
  empty: { color: "#94a3b8", marginTop: 10 },
});

