import { BorderColor, FormatColorFill } from '@mui/icons-material';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import CursorIcon from '../../Icons/CursorIcon';
import GrabIcon from '../../Icons/GrabIcon';
import ToolbarButton from './ToolbarButton/ToolbarButton';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector';
import {
  CursorMode,
  getCursorMode,
  setCursorMode,
} from '../../../redux/slices/editorSlice';
import { useFabricJSEditor } from '../Editor';
import { CIRCLE } from '../defaultShapes';
import { fabric } from 'fabric';
import { useEditor } from '../EditorContext';

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

  const handleSetCursorMode = useCallback((mode: CursorMode) => {
    dispatch(setCursorMode(mode));
  }, []);

  const onAddCircle = () => {
    console.log('onAddCircle', editor);
    const object = new fabric.Circle({
      ...CIRCLE,
    });
    editor?.add(object);
  };

  return (
    <StyledToolbar>
      <ToolbarButton
        title="Select"
        icon={<CursorIcon />}
        selected={cursorMode === 'select'}
        onClick={() => onAddCircle()}
      />
      <ToolbarButton
        title="Move"
        icon={<GrabIcon />}
        selected={cursorMode === 'pan'}
        onClick={() => handleSetCursorMode('pan')}
      />
      <ToolbarButton title="Background Color" icon={<FormatColorFill />} />
      <ToolbarButton title="Border Color" icon={<BorderColor />} />
    </StyledToolbar>
  );
};

export default Toolbar;
