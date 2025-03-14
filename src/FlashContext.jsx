// contexts/FlashContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import { nanoid } from 'nanoid';

const FlashContext = createContext();

export function FlashProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const addFlash = (type, message, timeout = 5000) => {
    const id = nanoid();
    setMessages(prev => [...prev, { id, type, message, show: true }]);
    
    // Auto-remove after timeout
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => msg.id !== id));
    }, timeout);
  };

  return (
    <FlashContext.Provider value={{ addFlash }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {messages.map(message => (
          <FlashMessage key={message.id} {...message} />
        ))}
      </div>
    </FlashContext.Provider>
  );
}

export const useFlash = () => useContext(FlashContext);

const FlashMessage = ({ type, message, show }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setIsVisible(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  const typeStyles = {
    success: 'bg-green-500 border-green-600',
    error: 'bg-red-500 border-red-600',
    warning: 'bg-yellow-500 border-yellow-600',
    info: 'bg-blue-500 border-blue-600'
  };

  return (
    <div
      className={`${typeStyles[type]} text-white px-6 py-3 rounded-lg shadow-lg border-l-4 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
      }`}
      role="alert"
    >
      {message}
    </div>
  );
};