import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../Store/GameSlice'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

function Chat({ player }) {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages);

  const sendMessage = () => {
    if (input.trim()) {
      const messageWithTime = {
        text: `Player ${player}: ${input}`,
        player, 
        time: getCurrentTime()
      };
      dispatch(addMessage(messageWithTime));
      setInput('');
    }
  };

  return (
    <div className="chat">
      <div className='player'><h1> Player {player}</h1></div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`message ${msg.player === player ? 'player-one' : 'player-two'}`}> 
            <span>{msg.text}</span>
            <div className="timestamp">{msg.time}</div> 
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Message"
        className='send-messeges' />
      <button className='send' onClick={sendMessage}><FontAwesomeIcon icon={faPaperPlane} /></button>
    </div>
  );
}

export default Chat;

