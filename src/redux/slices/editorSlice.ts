import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CursorMode = 'select' | 'pan';

interface EditorState {
  cursorMode: CursorMode;
  draggingSrc: string | null;
}

const initialState: EditorState = {
  cursorMode: 'select',
  draggingSrc: null,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setCursorMode: (state, action: PayloadAction<CursorMode>) => {
      state.cursorMode = action.payload;
    },
    setDraggingSrc: (state, action: PayloadAction<string | null>) => {
      state.draggingSrc = action.payload;
    },
  },
});

export const { setCursorMode, setDraggingSrc } = editorSlice.actions;

// Selectors
export const getCursorMode = (state: RootState) => state.editor.cursorMode;
export const getDraggingSrc = (state: RootState) => state.editor.draggingSrc;

export default editorSlice.reducer;
