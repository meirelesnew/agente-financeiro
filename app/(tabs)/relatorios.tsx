import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import {
  CATEGORIAS,
  type Categoria,
  type Lancamento,
  loadLancamentos,
} from "../../services/storage";

type Filtro = "mes" | "todos";

export default function Relatorios() {
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [filtro, setFiltro] = useState<Filtro>("mes");

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

  const hoje = new Date();

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

  const filtered = useMemo(() => {
    if (filtro === "todos") return lancamentos;
    return lancamentos.filter((l) => {
      const d = new Date(l.dataISO);
      return d.getMonth() === hoje.getMonth() && d.getFullYear() === hoje.getFullYear();
    });
  }, [lancamentos, filtro, hoje]);

  const resumo = useMemo(() => {
    const entradas = filtered.filter((l) => l.tipo === "Entrada").reduce((s, l) => s + l.valor, 0);
    const saidasAbs = Math.abs(filtered.filter((l) => l.tipo === "Saída").reduce((s, l) => s + l.valor, 0));
    const saldo = entradas - saidasAbs;
    return { entradas, saidas: saidasAbs, saldo };
  }, [filtered]);

  const porCategoria = useMemo(() => {
    const map = new Map<Categoria, number>();
    (CATEGORIAS as readonly Categoria[]).forEach((c) => map.set(c, 0));
    for (const l of filtered) {
      map.set(l.categoria, (map.get(l.categoria) || 0) + l.valor);
    }
    // Transform into sorted array, show only non-zero
    const arr = Array.from(map.entries())
      .map(([categoria, valor]) => ({ categoria, valor }))
      .filter((x) => Math.abs(x.valor) > 0.005)
      .sort((a, b) => Math.abs(b.valor) - Math.abs(a.valor));
    return arr;
  }, [filtered]);

  const tituloFiltro = filtro === "mes" ? "Mês atual" : "Todos";

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Relatórios</Text>
        <View style={styles.filterRow}>
          <Pressable onPress={() => setFiltro("mes")} style={[styles.pill, filtro === "mes" && styles.pillOn]}>
            <Text style={styles.pillText}>Mês atual</Text>
          </Pressable>
          <Pressable onPress={() => setFiltro("todos")} style={[styles.pill, filtro === "todos" && styles.pillOn]}>
            <Text style={styles.pillText}>Todos</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.cards}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Entradas ({tituloFiltro})</Text>
          <Text style={styles.cardValue}>{formatCurrency(resumo.entradas)}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Saídas ({tituloFiltro})</Text>
          <Text style={styles.cardValue}>{formatCurrency(resumo.saidas)}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Saldo ({tituloFiltro})</Text>
          <Text style={styles.cardValue}>{formatCurrency(resumo.saldo)}</Text>
        </View>
      </View>

      <Text style={styles.section}>Total por categoria</Text>

      {carregando ? (
        <Text style={styles.empty}>Carregando...</Text>
      ) : filtered.length === 0 ? (
        <Text style={styles.empty}>Sem lançamentos para o período selecionado.</Text>
      ) : (
        <FlatList
          data={porCategoria}
          keyExtractor={(item) => item.categoria}
          renderItem={({ item }) => (
            <View style={styles.catRow}>
              <Text style={styles.catName}>{item.categoria}</Text>
              <Text style={[styles.catVal, item.valor >= 0 ? styles.valIn : styles.valOut]}>
                {formatCurrency(item.valor)}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b1220", padding: 16, paddingTop: 48 },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  title: { color: "#e2e8f0", fontSize: 22, fontWeight: "800" },
  filterRow: { flexDirection: "row", gap: 8 },
  pill: { paddingVertical: 8, paddingHorizontal: 10, borderRadius: 12, backgroundColor: "#111a2e", marginLeft: 8 },
  pillOn: { backgroundColor: "#1d4ed8" },
  pillText: { color: "#e2e8f0", fontWeight: "700", fontSize: 12 },

  cards: { flexDirection: "row", gap: 8, marginBottom: 14 },
  card: { flex: 1, backgroundColor: "#111a2e", borderRadius: 14, padding: 10 },
  cardLabel: { color: "#94a3b8", fontSize: 12 },
  cardValue: { color: "#e2e8f0", fontSize: 14, fontWeight: "700", marginTop: 4 },

  section: { color: "#e2e8f0", fontSize: 16, fontWeight: "800", marginTop: 6, marginBottom: 6 },
  empty: { color: "#94a3b8", marginTop: 10 },

  catRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#111a2e", borderRadius: 12, padding: 12, marginBottom: 8 },
  catName: { color: "#e2e8f0", fontWeight: "700" },
  catVal: { color: "#e2e8f0", fontWeight: "900" },
  valIn: { color: "#34d399" },
  valOut: { color: "#f87171" },
});
