import React from 'react';
import Game from './Components/Game';
import Chat from './Components/Chat';
import { Provider } from 'react-redux';
import  { store }  from './Store/Store';
import './App.css'

function App() {

  return (
    <Provider store={store}>
      <div className="game-container">
        <div className="player-side">
          <Game player="X" />
          <Chat player="1" />
        </div>
        <div className="player-side">
          <Game player="O" /> 
          <Chat player="2" /> 
        </div>
      </div>
    </Provider>
  );
}

export default App;
