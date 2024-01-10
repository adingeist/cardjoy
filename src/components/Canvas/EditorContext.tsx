import React from 'react';

export type SelectionModes = 'select' | 'grab';

interface IEditorContext {
  selectionMode: SelectionModes;
  selectedObjects: fabric.Object[];
  editor: fabric.Canvas | null;
}

const EditorContext = React.createContext<IEditorContext>({
  selectionMode: 'select',
  selectedObjects: [],
  editor: null,
});

export const EditorProvider = EditorContext.Provider;
export const useEditor = () => React.useContext(EditorContext);
