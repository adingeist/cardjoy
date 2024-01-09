import React from 'react';

interface IEditorContext {
  selectedObjects: fabric.Object[];
  editor: fabric.Canvas | null;
}

const EditorContext = React.createContext<IEditorContext>({
  selectedObjects: [],
  editor: null,
});

export const EditorProvider = EditorContext.Provider;
export const useEditor = () => React.useContext(EditorContext);
