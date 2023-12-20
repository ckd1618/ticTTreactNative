import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import Game from "./Game";

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Tic Tac Toe Game</Text>
      <Game />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default App;
