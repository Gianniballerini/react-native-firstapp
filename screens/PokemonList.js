import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, TouchableHighlight } from "react-native";
import { Card, CardItem, Body, Text, Container } from 'native-base';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

export default function PokemonList({ navigation }) {
  const [pokemonData, setPokemonData] = useState([])
  useEffect(() => {
    fetchPokemonData()
  },[]) // empty [] to only make this on load

  const [selectedId, setSelectedId] = useState(null);

  async function fetchPokemonData() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=60')
      let json = await response.json()
      setPokemonData(json.results)
    } catch(error) {
      console.error(error);
    }
  }

  const Item = ({ item, onPress, style }) => (
    <TouchableHighlight onPress={onPress} style={[styles.item, style]}>
        <Card>
            <CardItem>
                <Body>
                    <Text style={styles.title}>{item.name.capitalize()}</Text>
                </Body>
            </CardItem>
        </Card>
    </TouchableHighlight>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.name === selectedId ? "#6e3b6e" : null;
    return (
      <Item
        item={item}
        onPress={() => {
            setSelectedId(item.name);
            navigation.navigate('PokemonDetail', { item: item });
        }}
        style={{ backgroundColor }}
      />
    );
  };

  return (
      <Container>
        <FlatList
          data={pokemonData}
          renderItem={renderItem}
          keyExtractor={item => item.name}
          extraData={selectedId}
        />
      </Container>
  );
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
