import { styled, useTheme } from '@mui/material';
import { fabric } from 'fabric';
import React, { useEffect, useRef } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { CanvasProvider } from './CanvasContext';
import Toolbar from './Toolbar/Toolbar';
import { drawGrid } from './drawGrid';
import usePanning from './enablePanning';
import { enableScrollZoom } from './enableScrollZoom';

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

const EditorContainer = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Canvas: React.FC<CanvasProps> = ({ id = `canvas_${uuidV4()}` }) => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const [canvas, setCanvas] = React.useState<fabric.Canvas | null>(null);
  const theme = useTheme();
  const { enablePanning } = usePanning();

  useEffect(() => {
    const canvasElement = document.getElementById(id) as HTMLCanvasElement;
    if (!canvasElement) return;

    const fabricCanvas = new fabric.Canvas(canvasElement, {
      width: canvasElement.clientWidth,
      height: canvasElement.clientHeight,
    });

    canvasRef.current = fabricCanvas;

    drawGrid(fabricCanvas, theme.palette.grey[100]);
    enableScrollZoom(fabricCanvas);
    enablePanning(fabricCanvas);

    const rect = new fabric.Rect({
      width: 100,
      height: 100,
      fill: 'red',
      left: 100,
      top: 100,
    });

    fabricCanvas.add(rect);

    // Add an orange rectangle to all four corners of the canvas
    const rect1 = new fabric.Rect({
      width: 100,
      height: 100,
      fill: 'orange',
      left: 0,
      top: 0,
    });
    fabricCanvas.add(rect1);
    const rect2 = new fabric.Rect({
      width: 100,
      height: 100,
      fill: 'orange',
      left: fabricCanvas.width! - 100,
      top: 0,
    });
    fabricCanvas.add(rect2);
    const rect3 = new fabric.Rect({
      width: 100,
      height: 100,
      fill: 'orange',
      left: 0,
      top: fabricCanvas.height! - 100,
    });
    fabricCanvas.add(rect3);
    const rect4 = new fabric.Rect({
      width: 100,
      height: 100,
      fill: 'orange',
      left: fabricCanvas.width! - 100,
      top: fabricCanvas.height! - 100,
    });
    fabricCanvas.add(rect4);

    if (!canvas) {
      setCanvas(fabricCanvas);
    }
    console.log('render');
  }, [id]);

  return (
    <CanvasProvider value={{ canvas }}>
      <EditorContainer>
        <Toolbar />
        <CanvasContainer>
          <StyledCanvas id={id}></StyledCanvas>
        </CanvasContainer>
      </EditorContainer>
    </CanvasProvider>
  );
};

export default Canvas;
