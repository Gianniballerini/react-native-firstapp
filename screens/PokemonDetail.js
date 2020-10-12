import React, { useState, useEffect } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { Card, CardItem, Body, Text, Container } from 'native-base';
import { AppLoading } from 'expo'

export default function PokemonDetail({ navigation }) {
    const [isReady, setIsReady] = useState(null)
    const [pokemonData, setPokemonData] = useState([])
    useEffect(() => {
        fetchPokemonData(navigation.state.params.item.name)
    }, []) // empty [] to only make this on load

    async function fetchPokemonData(name) {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + name)
            let json = await response.json()
            setPokemonData(json)
            setIsReady(true)
        } catch (error) {
            console.error(error);
        }
    }

    const getColorByType = (color) => {
        let types = {
            normal: "#A8A77A",
            fire: "#EE8130",
            water:  "#6390F0",
            electric:  "#F7D02C",
            grass:  "#7AC74C",
            ice:  "#96D9D6",
            fighting:  "#C22E28",
            poison:  "#A33EA1",
            ground:  "#E2BF65",
            flying:  "#A98FF3",
            psychic:  "#F95587",
            bug:  "#A6B91A",
            rock:  "#B6A136",
            ghost:  "#735797",
            dragon:  "#6F35FC",
            dark:  "#705746",
            steel:  "#B7B7CE",
            fairy:  "#D685AD"
        }
        return types[color]
    }

    if (!isReady) {
        return <AppLoading />;
    }
    let color = getColorByType(pokemonData.types[0].type.name)
    return (
        <Container>
            <StatusBar backgroundColor={color} />
            <Card>
                <CardItem>
                    <Body>
                        <Text style={styles.title}>{pokemonData.name}</Text>
                        {pokemonData.types.map(item => {
                            return <Text key={item.slot}>{item.type.name}</Text>
                        })}
                    </Body>
                </CardItem>
            </Card>
        </Container>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
    },
});
