import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  messages: [],
  gameOver: false,
  scoreX: 0,
  scoreO: 0
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    makeMove: (state, action) => {
      const { index } = action.payload;
      if (!state.board[index] && !state.winner) {
        state.board[index] = state.currentPlayer;
        state.winner = calculateWinner(state.board);
        if (!state.winner) {
          state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
        } else {
          state.gameOver = true;
          if (state.winner === 'X') {
            state.scoreX += 1; 
          } else if (state.winner === 'O') {
            state.scoreO += 1; 
          }
        }
      }
    },
    resetGame: (state) => {
      state.board = Array(9).fill(null);
      state.currentPlayer = 'X';
      state.winner = null;
      state.gameOver = false;
    },
    resetScores: (state) => {
      state.scoreX = 0;
      state.scoreO = 0;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    }
  }
});

export const { makeMove, resetGame, resetScores, addMessage } = gameSlice.actions;

export default gameSlice.reducer;

function calculateWinner(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}
