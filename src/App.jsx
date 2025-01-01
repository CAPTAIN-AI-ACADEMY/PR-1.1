import React, { useState } from 'react';

  function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
      if (!input.trim()) return;
      const userMessage = { text: input, sender: 'user' };
      setMessages([...messages, userMessage, { text: 'Sure, I am processing your request…', sender: 'ai' }]);
      setInput('');

      try {
        const response = await fetch('https://hook.eu1.make.com/px88e71m3zj91dpnys2onadzq9vshpiv', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: input })
        });

        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.text();
        setMessages((prev) => [...prev.slice(0, -1), { text: data, sender: 'ai' }]);
      } catch (error) {
        setMessages((prev) => [...prev.slice(0, -1), { text: 'Something went wrong. Please try again.', sender: 'ai' }]);
      }
    };

    const handleInputChange = (e) => {
      setInput(e.target.value);
      e.target.style.height = 'auto';
      e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const renderMessage = (msg) => {
      return msg.text.split('\n').map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ));
    };

    return (
      <div className="chat-container">
        <header>PROMETHEUS AI</header>
        <div className="chat-area">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {renderMessage(msg)}
            </div>
          ))}
        </div>
        <div className="input-area">
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Write your request here..."
            rows="1"
            style={{ overflowY: 'auto' }}
          />
          <button onClick={handleSend}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    );
  }

  export default App;
