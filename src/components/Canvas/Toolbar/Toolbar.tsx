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

const StyledToolbar = styled('div')`
  display: flex;
  align-items: center;
  width: 100%;
  height: 54px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
`;

const Toolbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const cursorMode = useAppSelector(getCursorMode);

  const handleSetCursorMode = useCallback((mode: CursorMode) => {
    dispatch(setCursorMode(mode));
  }, []);

  return (
    <StyledToolbar>
      <ToolbarButton
        title="Select"
        icon={<CursorIcon />}
        selected={cursorMode === 'select'}
        onClick={() => handleSetCursorMode('select')}
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
