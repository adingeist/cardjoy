import { styled, useTheme } from '@mui/material';
import { fabric } from 'fabric';
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { enableScrollZoom } from './enableScrollZoom';
import { limitViewport } from './limitViewport';
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
  const isPanningRef = useRef(false);
  const initialTouchXY = useRef({ x: 0, y: 0 });

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

    // Handle the mouse down event
    canvas.on('mouse:down', (opt) => {
      const evt = opt.e;
      isPanningRef.current = true;
      initialTouchXY.current = {
        x: evt.clientX,
        y: evt.clientY,
      };
      canvas.selection = false; // Disable object selection when panning
    });

    canvas.on('mouse:move', (opt) => {
      if (isPanningRef.current) {
        const e = opt.e;
        const vpt = canvas.viewportTransform!;

        // Calculate the changes in x and y positions
        const dx = e.clientX - initialTouchXY.current.x;
        const dy = e.clientY - initialTouchXY.current.y;

        // Update the viewport position with these changes
        vpt[4] += dx;
        vpt[5] += dy;

        // Limit viewport to the canvas size
        limitViewport(canvas);

        canvas.requestRenderAll();
        initialTouchXY.current = {
          x: e.clientX,
          y: e.clientY,
        };
      }
    });

    // Handle the mouse up event
    canvas.on('mouse:up', () => {
      isPanningRef.current = false;
      canvas.selection = true; // Re-enable object selection after panning
    });

    const rect = new fabric.Rect({
      width: 100,
      height: 100,
      fill: 'red',
      left: 100,
      top: 100,
    });

    canvas.add(rect);

    // Add an orange rectangle to all four corners of the canvas
    const rect1 = new fabric.Rect({
      width: 100,
      height: 100,
      fill: 'orange',
      left: 0,
      top: 0,
    });
    canvas.add(rect1);
    const rect2 = new fabric.Rect({
      width: 100,
      height: 100,
      fill: 'orange',
      left: canvas.width! - 100,
      top: 0,
    });
    canvas.add(rect2);
    const rect3 = new fabric.Rect({
      width: 100,
      height: 100,
      fill: 'orange',
      left: 0,
      top: canvas.height! - 100,
    });
    canvas.add(rect3);
    const rect4 = new fabric.Rect({
      width: 100,
      height: 100,
      fill: 'orange',
      left: canvas.width! - 100,
      top: canvas.height! - 100,
    });
    canvas.add(rect4);
  }, [id]);

  return (
    <CanvasContainer>
      <StyledCanvas id={id}></StyledCanvas>
    </CanvasContainer>
  );
};

export default Canvas;
