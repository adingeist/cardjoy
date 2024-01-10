import { BorderColor, FormatColorFill } from '@mui/icons-material';
import { fabric } from 'fabric';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector';
import {
  CursorMode,
  getCursorMode,
  setCursorMode,
} from '../../../redux/slices/editorSlice';
import CursorIcon from '../../Icons/CursorIcon';
import GrabIcon from '../../Icons/GrabIcon';
import { useEditor } from '../EditorContext';
import { CIRCLE } from '../defaultShapes';
import ToolbarButton from './ToolbarButton/ToolbarButton';

const StyledToolbar = styled('div')`
  display: flex;
  align-items: center;
  width: 100%;
  height: 54px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
`;

const Toolbar: React.FC = () => {
  const { editor } = useEditor();
  const dispatch = useAppDispatch();
  const cursorMode = useAppSelector(getCursorMode);

  const handleSetCursorMode = useCallback(
    (mode: CursorMode) => {
      console.log('handleSetCursorMode', editor);
      dispatch(setCursorMode(mode));
    },
    [dispatch, editor]
  );

  const onAddCircle = () => {
    console.log('onAddCircle', editor);
    const object = new fabric.Circle({
      ...CIRCLE,
    });
    editor?.add(object);
  };

  const handleSelectCursorMode = useCallback(() => {
    handleSetCursorMode('select');
  }, []);

  const handlePanCursorMode = useCallback(() => {
    console.log('handlePanCursorMode', editor);

    if (!editor) return;

    editor.defaultCursor = 'grab';
    editor.selection = false;

    handleSetCursorMode('pan');
  }, [editor]);

  return (
    <StyledToolbar>
      <ToolbarButton
        title="Select"
        icon={<CursorIcon />}
        selected={cursorMode === 'select'}
        onClick={handleSelectCursorMode}
      />
      <ToolbarButton
        title="Move"
        icon={<GrabIcon />}
        selected={cursorMode === 'pan'}
        onClick={handlePanCursorMode}
      />
      <ToolbarButton title="Background Color" icon={<FormatColorFill />} />
      <ToolbarButton title="Border Color" icon={<BorderColor />} />
    </StyledToolbar>
  );
};

export default Toolbar;
