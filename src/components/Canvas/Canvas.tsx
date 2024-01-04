import { styled, useTheme } from '@mui/material';
import { fabric } from 'fabric';
import React, { useEffect, useRef } from 'react';
import { v4 as uuidV4 } from 'uuid';

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
  const drawGrid = (canvas: fabric.Canvas, gridSize = 50) => {
    const color = theme.palette.grey[100];
    const width = canvas.getWidth();
    const height = canvas.getHeight();
    for (let i = 0; i < width / gridSize; i++) {
      canvas.add(
        new fabric.Line([i * gridSize, 0, i * gridSize, height], {
          stroke: color,
          selectable: false,
        })
      );
      canvas.add(
        new fabric.Line([0, i * gridSize, width, i * gridSize], {
          stroke: color,
          selectable: false,
        })
      );
    }
  };

  useEffect(() => {
    const canvasElement = document.getElementById(id) as HTMLCanvasElement;
    if (!canvasElement) return;

    const canvas = new fabric.Canvas(canvasElement, {
      width: canvasElement.clientWidth,
      height: canvasElement.clientHeight,
    });

    canvasRef.current = canvas;

    // Draw grid
    drawGrid(canvas);

    const rect = new fabric.Rect({
      width: 100,
      height: 100,
      fill: 'red',
      left: 100,
      top: 100,
    });

    // Mouse wheel event for zooming
    canvas.on('mouse:wheel', function (opt) {
      const delta = opt.e.deltaY;
      let zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 1) zoom = 1;

      // Get the point under the mouse
      const pointer = canvas.getPointer(opt.e);
      const point = { x: pointer.x, y: pointer.y };

      // Calculate zoom values around the cursor
      const zoomPoint = new fabric.Point(point.x, point.y);
      canvas.zoomToPoint(zoomPoint, zoom);

      opt.e.preventDefault();
      opt.e.stopPropagation();
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
