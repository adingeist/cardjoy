import { Tooltip } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useEditor } from '../../EditorContext';

interface Props {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
  selected?: boolean;
}

interface StyledButtonProps {
  selected: Props['selected'];
  onClick?: Props['onClick'];
}

const StyledButton = styled('button')<StyledButtonProps>`
  margin-left: 10px;
  width: 40px;
  height: 40px;
  border: none;
  background-color: ${({ theme, selected }) =>
    selected ? theme.palette.grey[300] : 'transparent'};
  border-color: ${({ theme, selected }) =>
    selected ? 'transparent' : theme.palette.grey[200]};
  border-style: solid;
  border-radius: 5px;
  border-width: 1px;
  cursor: pointer;
  position: relative;

  &:hover {
    border-color: ${({ theme, selected }) =>
      selected ? 'transparent' : theme.palette.grey[300]};
    background-color: ${({ theme, selected }) =>
      selected ? theme.palette.grey[300] : theme.palette.grey[100]};
  }
`;

const ToolbarButton: React.FC<Props> = ({
  icon,
  title,
  onClick,
  selected = false,
}) => {
  const { editor } = useEditor();

  const getFill = () => {
    if (!editor) {
      return 'transparent';
    }

    const activeObjects = editor.getActiveObjects();

    if (activeObjects.length === 1 && activeObjects[0].fill) {
      return activeObjects[0].fill;
    }

    // Check if all objects have the same color
    const isSameColor = activeObjects.every(
      (object) => object.fill === activeObjects[0].fill
    );

    // If all objects have the same color, return that color
    if (activeObjects.length > 1 && isSameColor && activeObjects[0].fill) {
      return activeObjects[0].fill;
    }

    return 'transparent';
  };

  console.log(getFill());

  return (
    <Tooltip title={title}>
      <StyledButton onClick={onClick} selected={selected}>
        {icon}
        <div
          style={{
            position: 'absolute',
            width: '20px',
            top: '25px',
            left: '9px',
            height: '4px',
            backgroundColor: getFill() as string,
          }}
        />
      </StyledButton>
    </Tooltip>
  );
};

export default ToolbarButton;
