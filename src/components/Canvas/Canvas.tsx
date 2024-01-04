import { styled, useTheme } from '@mui/material';
import { fabric } from 'fabric';
import React, { useEffect, useRef } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { enableScrollZoom } from './enableScrollZoom';
import { drawGrid } from './drawGrid';

interface CanvasProps {
  id?: string;
}

const CanvasContainer = styled('div')`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const StyledCanvas = styled('canvas')`
  width: 100%;
  height: 100%;
`;

const Canvas: React.FC<CanvasProps> = ({ id = `canvas_${uuidV4()}` }) => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const theme = useTheme();

  // Function to draw grid

  useEffect(() => {
    const canvasElement = document.getElementById(id) as HTMLCanvasElement;
    if (!canvasElement) return;

    const canvas = new fabric.Canvas(canvasElement, {
      width: canvasElement.clientWidth,
      height: canvasElement.clientHeight,
    });

    canvasRef.current = canvas;

    drawGrid(canvas, theme.palette.grey[100]);
    enableScrollZoom(canvas);

    const rect = new fabric.Rect({
      width: 100,
      height: 100,
      fill: 'red',
      left: 100,
      top: 100,
    });

    canvas.add(rect);
  }, [id]);

  return (
    <CanvasContainer>
      <StyledCanvas id={id}></StyledCanvas>
    </CanvasContainer>
  );
};

export default Canvas;
