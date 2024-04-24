import React from 'react';

interface MessageProps {
  sender: 'user' | 'bot';
  content: string;
}

const Message: React.FC<MessageProps> = ({ sender, content }) => {
  return <div className={`message ${sender}`}>{content}</div>;
};

export default Message;
