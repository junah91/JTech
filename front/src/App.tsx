import React, { useState, useEffect } from 'react';
import './App.css';

const TypingText: React.FC = () => {
  const text = 'WELCOME';
  const [typedText, setTypedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let typingInterval: NodeJS.Timeout;

    if (index < text.length) {
      typingInterval = setTimeout(() => {
        setTypedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 1000); // 1 letter per second
    } else {
      // After full word is typed, wait 3 seconds and restart
      typingInterval = setTimeout(() => {
        setTypedText('');
        setIndex(0);
      }, 3000);
    }

    return () => clearTimeout(typingInterval);
  }, [index, text]);

  return <h2 className="typing-text">{typedText}</h2>;
};



// LoadingDots component
const LoadingDots: React.FC = () => {
  const [dots, setDots] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => '.'.repeat((prev.length + 1) % 4));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return <div id="loading-text">Loading<span id="dots">{dots}</span></div>;
};

// CircleAnimation component
const CircleAnimation: React.FC = () => {
  const circles = Array.from({ length: 21 }, (_, i) => i);
  return (
    <div className="circle-container">
      {circles.map((i) => (
        <div
          key={i}
          className="circle"
          style={{ '--i': i } as React.CSSProperties}
        />
      ))}
    </div>
  );
};


// Main App component
const App: React.FC = () => {
  useEffect(() => {
    // Redirect after delay
    const timer = setTimeout(() => {
      window.location.href = 'landing.html'; // Adjust to your correct URL
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <TypingText />
      <CircleAnimation />
      <div id="preloader">
        <LoadingDots />
      </div>
    </div>
  );
};

export default App;
