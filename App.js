import React, { useState, useEffect } from "react";
import { Text, View, Alert, Pressable, SafeAreaView, StyleSheet, Button } from "react-native";
import Quad from "./Quad";

const emptyGame = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

export default function App() {
  const [game, setGame] = useState(emptyGame);
  const [currentTurn, setCurrentTurn] = useState("x");

  const [playerWinCount, setPlayerWinCount] = useState(0);
  const [computerWinCount, setComputerWinCount] = useState(0);

  useEffect(() => {
    if (currentTurn === "o") {
      botTurn();
    }
  }, [currentTurn]);

  useEffect(() => {
    const vencedor = getVencedor(game);
    if (vencedor) {
      jogoGanho(vencedor);
      if (vencedor === 'x') {
        return setPlayerWinCount(playerWinCount + 1);
      } else if (vencedor === 'o') {
        return setComputerWinCount(computerWinCount + 1);
      } else {
        return checkTie();
      }
    }
  }, [game]);

  const onPress = (rowIndex, columnIndex) => {
    if (game[rowIndex][columnIndex] !== "") {
      Alert.alert("Posição ocupada");
      return;
    }
    setGame((existingGame) => {
      const updateGame = [...existingGame];
      updateGame[rowIndex][columnIndex] = currentTurn;
      return updateGame;
    });

    setCurrentTurn(currentTurn === "x" ? "o" : "x");
  };
  const getVencedor = (vencedorGame) => {
    for (let i = 0; i < 3; i++) {
      const linhaXVencedor = vencedorGame[i].every((quad) => quad === "x");
      const linhaOVencedor = vencedorGame[i].every((quad) => quad === "o");

      if (linhaXVencedor) {
        return "x";
      }
      if (linhaOVencedor) {
        return "o";
      }
    }
    for (let col = 0; col < 3; col++) {
      let colunaXVencedor = true;
      let colunaOVencedor = true;
      for (let lin = 0; lin < 3; lin++) {
        if (vencedorGame[lin][col] !== "x") {
          colunaXVencedor = false;
        }
        if (vencedorGame[lin][col] !== "o") {
          colunaOVencedor = false;
        }
      }
      if (colunaXVencedor) {
        return "x";
      }
      if (colunaOVencedor) {
        return "o";
      }
      let diagonal1OVencedor = true;
      let diagonal1XVencedor = true;
      let diagonal2OVencedor = true;
      let diagonal2XVencedor = true;
      for (let i = 0; i < 3; i++) {
        if (vencedorGame[i][i] !== "o") {
          diagonal1OVencedor = false;
        }
        if (vencedorGame[i][i] !== "x") {
          diagonal1XVencedor = false;
        }
        if (vencedorGame[i][2 - i] !== "o") {
          diagonal2OVencedor = false;
        }
        if (vencedorGame[i][2 - i] !== "x") {
          diagonal2XVencedor = false;
        }
      }
      if (diagonal1OVencedor || diagonal2OVencedor) {
        return "o";
      }
      if (diagonal1XVencedor || diagonal2XVencedor) {
        return "x";
      }
    }
  }
  const checkTie = () => {
    if (!game.some((lin) => lin.some((quad) => quad === ""))) {
      Alert.alert(`Empate`, `É um empate`, [{
        text: "Restart", onPress: resetGame,
      },
      ]);
    };
  };
  const jogoGanho = (jogador) => {
    Alert.alert(`WOW`, `Jogador ${jogador} ganhou!`, [{
      text: "Restart", onPress: resetGame,
    },
    ]);
  };

  const resetGame = () => {
    setGame([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setCurrentTurn("x");
  };

  const botTurn = () => {
    const posicoesPossiveis = [];
    game.forEach((row, rowIndex) => {
      row.forEach((quad, columnIndex) => {
        if (quad === "") {
          posicoesPossiveis.push({ row: rowIndex, col: columnIndex });
        }
      });
    });
    let escolha;

    if (!escolha) {
      escolha = posicoesPossiveis[Math.floor(Math.random() * posicoesPossiveis.length)];
    }
    if (escolha) {
      onPress(escolha.row, escolha.col);
    }
  };
  return (

    <View style={styles.container}>
      <View >
        <Text style={styles.title}>
          Jogo do Galo</Text>
      </View>
      <View style={styles.map}>
        {game.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.row}>
            {row.map((quad, columnIndex) => (
              <Quad
                key={`row-${rowIndex}-col-${columnIndex}`}
                quad={quad}
                onPress={() => onPress(rowIndex, columnIndex)}
              />
            ))}
          </View>
        ))}
      </View>
      <View >
        <Text style={{
          fontSize: 16,
          fontWeight: "bold",
          color: "#dac1a8",
          paddingTop: 10,
        }}>Vitórias Jogador: {playerWinCount}</Text>
        <Text style={{
          fontSize: 16,
          fontWeight: "bold",
          color: "#dac1a8",
          paddingTop: 10,
          paddingBottom: 30,
        }}>Vitórias Computador: {computerWinCount}</Text>
      </View>
      <View>
        <Text onPress={() => resetGame()}
          style={{
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 5,
            paddingRight: 5,
            backgroundColor: "chocolate",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            borderRadius: 15,
            borderColor: "black",
          }}>Restart
        </Text>
      </View>
    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "darkslategray",
    alignItems: "center",
    justifyContent: "center",

  },
  map: {
    borderColor: "chocolate",
    //borderWidth: 2,
    borderRadius: 5,
    width: "80%",
    aspectRatio: 1,
  },
  row: {
    flex: 1,
    flexDirection: "row",

  },
  title: {
    textAlign: "center",
    color: "#dac1a8",
    fontSize: 32,
    fontWeight: "bold",
    paddingBottom: 30,
  },
  buttons: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
  },
  button: {
    color: "white",
    margin: 10,
    fontSize: 16,
    backgroundColor: "#191F24",
    padding: 10,
    paddingHorizontal: 15,
  },
})