import { fabric } from 'fabric';
import React, { useEffect, useRef } from 'react';
import {
  FabricJSEditor,
  FabricJSEditorHook,
  useFabricJSEditor,
} from './Editor';
import styled from 'styled-components';
import { drawGrid } from './drawGrid';
import { useTheme } from '@mui/material';
import { enableScrollZoom } from './enableScrollZoom';
import usePanning from './enablePanning';

export interface Props {
  className?: string;
  onReady?: (canvas: fabric.Canvas) => void;
}

const StyledCanvas = styled('div')`
  width: 100%;
  height: 100%;
`;

/**
 * Fabric canvas as component
 */
const FabricJSCanvas = ({ className, onReady }: Props) => {
  const theme = useTheme();
  const canvasEl = useRef(null);
  const canvasElParent = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasEl.current);
    const setCurrentDimensions = () => {
      canvas.setHeight(canvasElParent.current?.clientHeight || 0);
      canvas.setWidth(canvasElParent.current?.clientWidth || 0);
      drawGrid(canvas, theme.palette.grey[200]);
      enableScrollZoom(canvas);
      canvas.renderAll();
    };
    const resizeCanvas = () => {
      setCurrentDimensions();
    };
    setCurrentDimensions();

    window.addEventListener('resize', resizeCanvas, false);

    if (onReady) {
      onReady(canvas);
    }

    return () => {
      canvas.dispose();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  return (
    <StyledCanvas ref={canvasElParent} className={className}>
      <canvas ref={canvasEl} />
    </StyledCanvas>
  );
};

export { FabricJSCanvas, useFabricJSEditor };
export type { FabricJSEditor, FabricJSEditorHook };
