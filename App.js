import { SafeAreaView, StatusBar, StyleSheet, FlatList } from "react-native"
import NotaEditor from "./src/componentes/NotaEditor"
import { Nota } from "./src/componentes/Nota";
import { useState, useEffect } from "react";
import { criarTabela, buscaNotas, buscarNotaPorCategoria } from "./src/servicos/Notas";
import { Picker } from "@react-native-picker/picker";

export default function App() {
  useEffect(() => {
    criarTabela();
    ObterNotas();
  }, []);

  const [notaSelecionada, setNotaSelecionada] = useState({});
  const [notas, setNotas] = useState([]);
  const [categoria, setCategoria] = useState("Todos");

  async function ObterNotas() {
    const notas = await buscaNotas();
    setNotas(notas);
  }

  async function FiltrarNotas(novaCategoria) {
    setCategoria(novaCategoria);
    if(novaCategoria === "Todos") return ObterNotas();

    const notasFiltradas = await buscarNotaPorCategoria(novaCategoria);
    setNotas(notasFiltradas);
  }

  return (
    <SafeAreaView style={estilos.container}>
      <Picker style={estilos.picker}
        selectedValue={categoria}
        onValueChange={(novaCategoria) => {
          FiltrarNotas(novaCategoria);
        }}
      >
        <Picker.Item label="Todos" value="Todos" />
        <Picker.Item label="Pessoal" value="Pessoal" />
        <Picker.Item label="Trabalho" value="Trabalho" />
        <Picker.Item label="Outros" value="Outros" />
      </Picker>
      <FlatList
        data={notas}
        renderItem={(nota) => <Nota {...nota} setNotaSelecionada={setNotaSelecionada} />}
        keyExtractor={(nota) => nota.id}
      >

      </FlatList>
      <NotaEditor mostraNotas={ObterNotas} notaSelecionada={notaSelecionada} setNotaSelecionada={setNotaSelecionada} />
      <StatusBar />
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  picker: {
    backgroundColor: '#FF9A94',
    margin: 20,
    borderWidth: 20
  }
})

