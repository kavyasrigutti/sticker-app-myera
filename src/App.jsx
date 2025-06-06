import React, { useState, useRef } from 'react';
import Canvas from './components/Canvas.jsx';
import StickerButton from './components/StickerButton.jsx';
import './App.css';

function App() {
  const [stickers, setStickers] = useState([]);
  const stageRef = useRef();

  const stickerData = [
    { id: 'sticker1', emoji: '😀', alt: 'Happy Face' },
    { id: 'sticker2', emoji: '❤️', alt: 'Heart' },
    { id: 'sticker3', emoji: '⭐', alt: 'Star' }
  ];

  const snapToGrid = (value) => {
    return Math.round(value / 40) * 40;
  };

  const addSticker = (stickerId) => {
    const stickerInfo = stickerData.find(s => s.id === stickerId);
    const newSticker = {
      id: Date.now(),
      type: stickerId,
      emoji: stickerInfo.emoji,
      x: snapToGrid(50),
      y: snapToGrid(50)
    };
    setStickers([...stickers, newSticker]);
  };

  const updateStickerPosition = (id, x, y) => {
    setStickers(stickers.map(sticker => 
      sticker.id === id 
        ? { ...sticker, x: snapToGrid(x), y: snapToGrid(y) }
        : sticker
    ));
  };

  const deleteSticker = (id) => {
    setStickers(stickers.filter(sticker => sticker.id !== id));
  };

  const downloadCanvas = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement('a');
    link.download = 'sticker-canvas.png';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>Myera Sticker App</h1>
        <p>Click stickers to add them to the canvas. Drag to move, double-click to delete.</p>
      </div>
      
      <div className="app-content">
        <div className="canvas-container">
          <Canvas
            stageRef={stageRef}
            stickers={stickers}
            onUpdateSticker={updateStickerPosition}
            onDeleteSticker={deleteSticker}
          />
        </div>
        
        <div className="controls">
          <div className="sticker-buttons">
            <h3>Add Stickers</h3>
            {stickerData.map(sticker => (
              <StickerButton
                key={sticker.id}
                stickerId={sticker.id}
                emoji={sticker.emoji}
                alt={sticker.alt}
                onClick={addSticker}
              />
            ))}
          </div>
          
          <div className="action-buttons">
            <button className="download-btn" onClick={downloadCanvas}>
              📥 Download Canvas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;