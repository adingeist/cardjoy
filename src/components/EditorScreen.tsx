import React from 'react';
import Canvas from './Canvas/Canvas';
import { useFabricJSEditor } from './Canvas/Editor';
import { EditorProvider } from './Canvas/EditorContext';
import CanvasSidebar from './Canvas/Sidebar/Sidebar';

const EditorScreen: React.FC = () => {
  const { editor, onReady } = useFabricJSEditor();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
      }}
    >
      <EditorProvider
        value={{
          selectionMode: 'select',
          editor,
          selectedObjects: [],
        }}
      >
        <CanvasSidebar />
        <Canvas onReady={onReady} />
      </EditorProvider>
    </div>
  );
};

export default EditorScreen;
