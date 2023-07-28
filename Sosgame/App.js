import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const initialBoard = ['', '', '', '', '', '', '', '', ''];
const players = ['s', 'o'];

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const checkWinner = () => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]             
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    if (!board.includes('')) {
      return 'draw';
    }

    return null;
  };

  const handleSquarePress = (index) => {
    if (board[index] === '') {
      const newBoard = [...board];
      newBoard[index] = players[currentPlayerIndex];
      setBoard(newBoard);

      const winner = checkWinner();
      if (winner) {
        if (winner === 'draw') {
          Alert.alert('Oyun Berabere!', 'Yeniden oynamak için tıklayın.', [{ text: 'Tamam', onPress: resetGame }]);
        } else {
          Alert.alert('Oyunun kazananıııı!', `${winner} kazandı! Yeniden oynamak için tıklayın.`, [{ text: 'Tamam', onPress: resetGame }]);
        }
      } else {
        setCurrentPlayerIndex(1 - currentPlayerIndex); 
      }
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayerIndex(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {board.map((square, index) => (
          <TouchableOpacity
            key={index}
            style={styles.square}
            onPress={() => handleSquarePress(index)}
          >
            <Text style={styles.squareText}>{square}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>Yeniden Oyna</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87ceff',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  square: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  squareText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  resetButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
