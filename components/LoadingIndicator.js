import React, { useState, useEffect } from 'react';

const LoadingIndicator = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots === '•••' ? '' : prevDots + '•'));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div className='font-bold text-white tracking-widest'>{dots}</div>;
};

export default LoadingIndicator;
