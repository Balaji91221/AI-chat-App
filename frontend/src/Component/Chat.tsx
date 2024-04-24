import React, { useState } from 'react';
import Message from './Message';
import ChatInput from './ChatInput';
import './chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRobot } from '@fortawesome/free-solid-svg-icons';

interface IMessage {
  sender: 'user' | 'bot';
  content: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([
    { sender: 'bot', content: 'Hello, I am AI Chatter! How may I assist you?' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim()) {
      const newUserMessage: IMessage = { sender: 'user', content: input };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);

      try {
        const response = await fetch('http://localhost:3002/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userMessage: input }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const newBotMessage: IMessage = { sender: 'bot', content: data.botResponse };
        setMessages((prevMessages) => [...prevMessages, newBotMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages((prevMessages) => [...prevMessages, { sender: 'bot', content: 'Uh oh! Cannot communicate with server.' }]);
      }

      setInput('');
    }
  };

  return (
    <div className="App">
      <div className="app-title">AI Chatter</div>
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.sender === 'user' ? (
              <FontAwesomeIcon icon={faUser} className="icon" />
            ) : (
              <FontAwesomeIcon icon={faRobot} className="icon" />
            )}
            <div className="message-content">{message.content}</div>
          </div>
        ))}
      </div>
      <ChatInput value={input} onChange={(e) => setInput(e.target.value)} onSend={sendMessage} />
    </div>
  );
};

export default Chat;