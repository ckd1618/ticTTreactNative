import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function Square({ value, onPress }) {
  return (
    <TouchableOpacity style={styles.square} onPress={onPress}>
      <Text style={styles.squareText}>{value}</Text>
    </TouchableOpacity>
  );
}

function GameBoard({ squares, onPress }) {
  return (
    <View>
      {[0, 3, 6].map((rowStart) => (
        <View key={rowStart} style={styles.boardRow}>
          {squares.slice(rowStart, rowStart + 3).map((square, i) => (
            <Square
              key={i}
              value={square}
              onPress={() => onPress(rowStart + i)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <View style={styles.game}>
      <View style={styles.gameBoard}>
        <GameBoard squares={squares} onPress={handleClick} />
      </View>
      <View style={styles.gameInfo}>
        <Text>{status}</Text>
        <TouchableOpacity style={styles.button} onPress={resetGame}>
          <Text>Reset Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const styles = StyleSheet.create({
  square: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#999",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
  },
  squareText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  boardRow: {
    flexDirection: "row",
  },
  game: {
    flexDirection: "row",
    padding: 20,
  },
  gameBoard: {
    flexDirection: "column",
  },
  gameInfo: {
    marginLeft: 20,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ddd",
    alignItems: "center",
  },
});

export default Game;
