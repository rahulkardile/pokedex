import { Image } from "expo-image";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface Pokemon {
  name: string,
  image: string,
  imageBack: string
  types: pokemonType[]
}

interface pokemonType {
  type: {
    name: string,
    url: string
  }
}

const colorsByType: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD"
};


export default function Index() {

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  useEffect(() => {
    fetchPokemon();
  }, [])

  async function fetchPokemon() {
    const data = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=10");
    const jsonPokemon = await data.json();

    const details = await Promise.all(
      jsonPokemon.results.map(async (pokemon: any) => {
        const res = await fetch(pokemon.url);
        const details = await await res.json();
        return {
          name: pokemon.name,
          image: details.sprites.front_default,
          imageBack: details.sprites.back_default,
          types: details.types
        }
      })
    )
    setPokemons(details);
  }

  return (
    <ScrollView contentContainerStyle={
      {
        gap: 16,
        padding: 16
      }
    }>
      {pokemons?.map((pokemon: Pokemon, index) => (
        <Link
          style={{
            backgroundColor: colorsByType[pokemon.types[0].type.name] + 30,
            padding: 20,
            borderRadius: 20
          }}
          key={index} href={{ pathname: "/details", params: {name: pokemon.name}}} >

          <View>
            <Text style={style.name}>{pokemon.name}</Text>
            <Text style={style.type}>{pokemon.types[0].type.name}</Text>
            <View
              style={{
                flexDirection: "row"
              }}
            >

              <Image
                source={{ uri: pokemon.image }}
                style={{
                  width: 200,
                  height: 200
                }}
              />
              <Image
                source={{ uri: pokemon.imageBack }}
                style={{
                  width: 200,
                  height: 200
                }}
              />
            </View>
          </View>
        </Link>
      ))}
    </ScrollView>
  );
}

const style = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center"
  },
  type: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center"
  },
})