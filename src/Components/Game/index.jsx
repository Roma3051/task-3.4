import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeMove, resetGame, resetScores } from '../../Store/GameSlice';

function Game({ player }) {
  const dispatch = useDispatch();
  const { board, currentPlayer, winner, gameOver, scoreX, scoreO } = useSelector(state => state);

  const handleClick = (index) => {
    if (currentPlayer === player && !gameOver) {
      dispatch(makeMove({ index }));
    }
  };

  const isDraw = () => {
    return board.every(cell => cell !== null) && !winner;
  };

  useEffect(() => {
    if (gameOver || isDraw()) {
      const timer = setTimeout(() => {
        dispatch(resetGame());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [gameOver, isDraw, dispatch]);

  const handleReset = () => {
    dispatch(resetGame()); 
    dispatch(resetScores()); 
  };

  return (
    <div>
      <h2>Player {player}</h2>
      {!gameOver && !isDraw() && currentPlayer === player && <h3>Your turn:</h3>}
      {!gameOver && !isDraw() && currentPlayer !== player && <h3>Wait for your opponent.</h3>}
      {gameOver && winner === player && <h3>You win!</h3>}
      {gameOver && winner && winner !== player && <h3>You lost!</h3>}
      {(gameOver && !winner) || isDraw() ? <h3>Draw!</h3> : null}



      <div className="score-board">
        <div>Score: {Number(scoreX)}:{Number(scoreO)}</div>
      </div>

      <div className="board">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            disabled={currentPlayer !== player || gameOver}
            className="cell">
            {cell}
          </button>
        ))}
      </div>

      <button onClick={handleReset} className='reset'>Reset</button>
    </div>
  );
}

export default Game;
