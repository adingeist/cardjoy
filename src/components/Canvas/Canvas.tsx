import { styled } from '@mui/material';
import React from 'react';
import { v4 as uuidV4 } from 'uuid';
import { EditorProvider } from './EditorContext';
import { FabricJSCanvas, useFabricJSEditor } from './FabricJsCanvas';
import Toolbar from './Toolbar/Toolbar';

interface CanvasProps {
  onReady?: (canvas: fabric.Canvas) => void;
}

const CanvasContainer = styled('div')`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const EditorContainer = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Canvas: React.FC<CanvasProps> = ({ onReady }) => {
  return (
    <EditorContainer>
      <Toolbar />
      <CanvasContainer>
        <FabricJSCanvas onReady={onReady} />
      </CanvasContainer>
    </EditorContainer>
  );
};

export default Canvas;
