import React from 'react';

const StickerButton = ({ stickerId, emoji, alt, onClick }) => {
  const handleClick = () => {
    onClick(stickerId);
  };

  return (
    <button 
      className="sticker-button"
      onClick={handleClick}
      title={`Add ${alt} sticker`}
      aria-label={`Add ${alt} sticker to canvas`}
    >
      <span style={{ marginRight: '8px', fontSize: '1.2em' }}>{emoji}</span>
      {alt}
    </button>
  );
};

export default StickerButton;