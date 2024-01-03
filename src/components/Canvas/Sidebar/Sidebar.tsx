import {
  AutoAwesome,
  EmojiNature,
  Image,
  Interests,
  Title,
} from '@mui/icons-material';
import { List } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import Panel, { PanelTabs } from './Panel/Panel';
import TabButton from './TabButton';

interface SidebarProps {}

const Sidebar = styled.div`
  width: 80px;
  background-color: ${({ theme }) => theme.palette.grey[900]};
  color: white;
  display: flex;
  flex-direction: column;
`;

const SidebarContainer = styled.div`
  display: flex;
`;

const CanvasSidebar: React.FC<SidebarProps> = () => {
  const [activeTab, setActiveTab] = useState<PanelTabs | null>(null);

  const handleTabClick = (tab: PanelTabs) => {
    setActiveTab(tab);
  };

  return (
    <SidebarContainer>
      <Sidebar>
        <List>
          <TabButton
            icon={<Interests />} // Material-UI icon for Shapes
            label="Shapes"
            activeTab={activeTab}
            onClick={function (): void {
              handleTabClick('Shapes');
            }}
          />
          <TabButton
            icon={<EmojiNature />} // Material-UI icon for Graphics
            label="Graphics"
            activeTab={activeTab}
            onClick={() => handleTabClick('Graphics')}
          />
          <TabButton
            icon={<Title />} // Material-UI icon for Text
            label="Text"
            activeTab={activeTab}
            onClick={() => handleTabClick('Text')}
          />
          <TabButton
            icon={<AutoAwesome />} // Material-UI icon for Text
            label="Generate"
            activeTab={activeTab}
            onClick={() => handleTabClick('Generate')}
          />
          <TabButton
            icon={<Image />} // Material-UI icon for Text
            label="Uploads"
            activeTab={activeTab}
            onClick={() => handleTabClick('Uploads')}
          />
        </List>
      </Sidebar>
      <Panel activeTab={activeTab} />
    </SidebarContainer>
  );
};

export default CanvasSidebar;
