import React from 'react';
import styled from 'styled-components';
import { ListItemIcon, ListItemText } from '@mui/material';
import { PanelTabs } from './Panel/Panel';

interface TabButtonProps {
  activeTab: PanelTabs | null;
  onClick: () => void;
  icon: React.ReactNode;
  label: PanelTabs;
}

interface StyledTabButtonProps {
  $isActive: boolean;
}

const StyledTabButton = styled.button<StyledTabButtonProps>`
  border: none;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.palette.primary.dark : 'transparent'};
  color: ${({ $isActive }) => ($isActive ? 'white' : 'inherit')};
  display: flex;
  width: 100%;
  height: 80px;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.1s ease;
  &:hover {
    background-color: ${({ $isActive, theme }) =>
      $isActive ? theme.palette.primary.dark : theme.palette.primary.main};
  }
`;

const StyledListItemIcon = styled(ListItemIcon)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TabButton: React.FC<TabButtonProps> = ({
  activeTab,
  onClick,
  icon,
  label,
}) => {
  return (
    <StyledTabButton $isActive={activeTab === label} onClick={onClick}>
      <div>
        <StyledListItemIcon sx={{ color: 'white' }}>{icon}</StyledListItemIcon>
        <ListItemText primary={label} />
      </div>
    </StyledTabButton>
  );
};

export default TabButton;
