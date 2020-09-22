import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, FlatList, Pressable, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [countriesData, setCountriesData] = useState([])

  function fetchCountriesData() {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=60')
      .then((response) => response.json())
      .then((json) => setCountriesData(json.results))
      .catch((error) => console.error(error))
  }

  useEffect(()=> {
    fetchCountriesData();
  })
  
  return (
    <>
      <StatusBar style='ligth'/>
      <FlatList
        data={countriesData}
        contentContainerStyle={styles.container}
        keyExtractor={item => item.name}
        renderItem={({item})=> <Text onPress={() => {Alert.alert(`The URL of ${item.name} is ${item.url}`)}} style={styles.text}>{item.name}</Text>}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});