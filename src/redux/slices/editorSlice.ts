import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CursorMode = 'select' | 'pan';

interface EditorState {
  cursorMode: CursorMode;
}

const initialState: EditorState = {
  cursorMode: 'select',
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setCursorMode: (state, action: PayloadAction<CursorMode>) => {
      console.log('setCursorMode', action.payload);
      state.cursorMode = action.payload;
    },
  },
});

export const { setCursorMode } = editorSlice.actions;

// Selectors
export const getCursorMode = (state: RootState) => state.editor.cursorMode;

export default editorSlice.reducer;
