import { styled } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

interface CanvasProps {}

const CanvasContainer = styled('div')`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const StyledCanvas = styled('canvas')`
  width: 100%;
`;

const Canvas: React.FC<CanvasProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;

    const resizeCanvas = () => {
      if (canvas) {
        // Set the canvas size to match the parent container size
        canvas.width = canvas.parentElement!.clientWidth;
        canvas.height = canvas.parentElement!.clientHeight;

        // Update the canvasSize state
        setCanvasSize({
          width: canvas.width,
          height: canvas.height,
        });
      }
    };

    // Call the resizeCanvas function initially
    resizeCanvas();

    // Add an event listener for window resize
    window.addEventListener('resize', resizeCanvas);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <CanvasContainer>
      <StyledCanvas ref={canvasRef}></StyledCanvas>
    </CanvasContainer>
  );
};

export default Canvas;
