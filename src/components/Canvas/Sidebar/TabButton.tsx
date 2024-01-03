import React from 'react';
import styled from 'styled-components';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { PanelTabs } from './Panel/Panel';

interface TabButtonProps {
  activeTab: PanelTabs | null;
  onClick: () => void;
  icon: React.ReactNode;
  label: PanelTabs;
}

const StyledTabButton = styled(ListItem)<{ isActive: boolean }>`
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.palette.primary.dark : 'transparent'};
  color: ${({ isActive }) => (isActive ? 'white' : 'inherit')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: ${({ isActive, theme }) =>
      isActive ? theme.palette.primary.dark : theme.palette.primary.main};
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
    <StyledTabButton isActive={activeTab === label} onClick={onClick}>
      <StyledListItemIcon sx={{ color: 'white' }}>{icon}</StyledListItemIcon>
      <ListItemText primary={label} />
    </StyledTabButton>
  );
};

export default TabButton;
