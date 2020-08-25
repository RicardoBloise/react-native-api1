import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      pokemon: [],
      lect: [],
      // url: "https://pokeapi.co/api/v2/pokemon",
      url: "http://www.hidro.gob.ar/api/v1/AlturasHorarias",
    };
  }

  componentDidMount() {
    this.getPokemon();
  }

  getPokemon = () => {
    this.setState({ loading: true });

    fetch(this.state.url)
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          // cuenta: res.count,
          // pokemon: res.results,
          // url: res.next,
          cuenta: res.type,
          pokemon: res.features,
          loading: false,
        })
      );
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          {/* <Text>Descargando Pokemons</Text> */}
          <Text>Descargando Alturas Mareográficas</Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, paddingTop: 50, paddingLeft: 5 }}>
        <Text
          style={{
            color: "red",
            textAlign: "center",
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Datos de Alturas Mareográficas
        </Text>
        {/* <Text>Cuenta: {this.state.cuenta}</Text> */}
        <FlatList
          data={this.state.pokemon}
          // renderItem={({ item }) => <Text>{item.name}</Text>}
          renderItem={({ item }) => (
            <Text
              style={{
                color: "blue",
                fontSize: 8,
              }}
            >
              ID: {item.id}({item.properties.nombre}) -- Coord.:{" "}
              {item.geometry.coordinates[0]}, {item.geometry.coordinates[1]} --
              Lecturas: {""}
              {item.properties.lecturas[1]}
            </Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
