import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function App() {
  const [pokemonData, setPokemonData] = useState([])
  const [selectedId, setSelectedId] = useState(null);

  async function fetchPokemonData() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=60')
      let json = await response.json()
      console.log(json.results)
      setPokemonData(json.results)
    } catch(error) {
      console.error(error);
    }
  }

  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.name === selectedId ? "#6e3b6e" : "#f9c2ff";
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.name)}
        style={{ backgroundColor }}
      />
    );
  };

  

  useEffect(() => {
    ()  => fetchPokemonData();
  })

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={pokemonData}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
