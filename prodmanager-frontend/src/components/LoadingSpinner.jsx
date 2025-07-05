import React from 'react';

const LoadingSpinner = ({ size = '40px', color = '#4285f4' }) => {
  const spinnerStyle = {
    width: size,
    height: size,
    border: `3px solid rgba(66, 133, 244, 0.2)`,
    borderTop: `3px solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '20px auto',
    display: 'block'
  };

  return (
    <div className="loading-container">
      <div style={spinnerStyle}></div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner; 