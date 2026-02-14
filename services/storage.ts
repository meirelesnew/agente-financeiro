import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEY = "@agente-financeiro:lancamentos_v1";

export const CATEGORIAS = [
  "Moradia",
  "Alimentação",
  "Transporte",
  "Carro",
  "Lazer",
  "Saúde",
  "Educação",
  "Investimentos",
  "Dívidas",
  "Outros",
] as const;

export type Categoria = (typeof CATEGORIAS)[number];
export type Tipo = "Entrada" | "Saída";

export type Lancamento = {
  id: string;
  dataISO: string; // melhor para filtros e relatórios
  categoria: Categoria;
  descricao: string;
  tipo: Tipo;
  valor: number; // Entrada positiva, Saída negativa
};

function isLancamento(x: any): x is Lancamento {
  return (
    x &&
    typeof x.id === "string" &&
    typeof x.dataISO === "string" &&
    typeof x.categoria === "string" &&
    typeof x.descricao === "string" &&
    (x.tipo === "Entrada" || x.tipo === "Saída") &&
    typeof x.valor === "number"
  );
}

export async function loadLancamentos(): Promise<Lancamento[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Filtra apenas itens válidos (evita travar caso algo corrompa)
    return parsed.filter(isLancamento);
  } catch (e) {
    console.log("Erro ao carregar lançamentos:", e);
    return [];
  }
}

export async function saveLancamentos(list: Lancamento[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.log("Erro ao salvar lançamentos:", e);
  }
}

export async function clearLancamentos(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.log("Erro ao limpar lançamentos:", e);
  }
}
