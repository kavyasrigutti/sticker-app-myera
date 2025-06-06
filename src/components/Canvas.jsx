import React from 'react';
import { Stage, Layer, Text, Line } from 'react-konva';

const Canvas = ({ stageRef, stickers, onUpdateSticker, onDeleteSticker }) => {
  const handleDragEnd = (e, stickerId) => {
    const node = e.target;
    onUpdateSticker(stickerId, node.x(), node.y());
  };

  const handleDoubleClick = (stickerId) => {
    onDeleteSticker(stickerId);
  };

  // Create grid lines for the canvas
  const gridLines = [];
  const gridSize = 40;
  const canvasWidth = 600;
  const canvasHeight = 400;

  // Vertical lines
  for (let i = 0; i <= canvasWidth / gridSize; i++) {
    gridLines.push(
      <Line
        key={`v-${i}`}
        points={[i * gridSize, 0, i * gridSize, canvasHeight]}
        stroke="#f0f0f0"
        strokeWidth={1}
      />
    );
  }

  // Horizontal lines
  for (let i = 0; i <= canvasHeight / gridSize; i++) {
    gridLines.push(
      <Line
        key={`h-${i}`}
        points={[0, i * gridSize, canvasWidth, i * gridSize]}
        stroke="#f0f0f0"
        strokeWidth={1}
      />
    );
  }

  return (
    <Stage
      ref={stageRef}
      width={canvasWidth}
      height={canvasHeight}
      style={{ 
        border: '2px solid #ddd',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Layer>
        {/* Grid lines */}
        {gridLines}
        
        {/* Render stickers */}
        {stickers.map((sticker) => (
          <Text
            key={sticker.id}
            x={sticker.x}
            y={sticker.y}
            text={sticker.emoji}
            fontSize={32}
            fontFamily="'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', sans-serif"
            draggable
            onDragEnd={(e) => handleDragEnd(e, sticker.id)}
            onDblClick={() => handleDoubleClick(sticker.id)}
            onMouseEnter={(e) => {
              const container = e.target.getStage().container();
              container.style.cursor = 'move';
            }}
            onMouseLeave={(e) => {
              const container = e.target.getStage().container();
              container.style.cursor = 'default';
            }}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;