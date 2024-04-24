import React from 'react';

interface ChatInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSend }) => {
  return (
    <div className="send-container">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder='Typing'
        onKeyPress={(e) => e.key === 'Enter' && onSend()}
      />
      <button type="button" onClick={onSend}>ASK YOUR DOUBTS</button>
    </div>
  );
};

export default ChatInput;
