import { Tooltip } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

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
  return (
    <Tooltip title={title}>
      <StyledButton onClick={onClick} selected={selected}>
        {icon}
      </StyledButton>
    </Tooltip>
  );
};

export default ToolbarButton;
