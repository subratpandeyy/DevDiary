import React, { useEffect } from 'react';

const RGBCard = ({ children }) => {
  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`
      @keyframes rgbBorder {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `, styleSheet.cssRules.length);
  }, []);

  return (
    <div style={{
      position: 'relative',
      borderRadius: '10px',
      padding: '2px',
      overflow: 'hidden',
      maxWidth: '100%',
      margin: 'auto'
    }}>
      <div style={{
        content: '""',
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'linear-gradient(60deg, red, orange, yellow, green, cyan, blue, violet, red)',
        animation: 'rgbBorder 6s linear infinite',
        zIndex: 1
      }} />
      <div style={{
        position: 'relative',
        background: '#111',
        color: 'white',
        borderRadius: '10px',
        // padding: '1rem',
        zIndex: 2
      }}>
        {children}
      </div>
    </div>
  );
};

export default RGBCard;
