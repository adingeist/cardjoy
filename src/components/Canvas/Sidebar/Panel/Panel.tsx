import React from 'react';
import styled from 'styled-components';
import ShapesPanel from './ShapesPanel';
import GraphicsPanel from './GraphicsPanel';
import TextPanel from './TextPanel';
import GeneratePanel from './GeneratePanel';
import UploadsPanel from './UploadsPanel';

const StyledPanel = styled.div`
  width: 320px;
  background-color: ${({ theme }) => theme.palette.grey[800]};
`;

export type PanelTabs = 'Shapes' | 'Graphics' | 'Text' | 'Generate' | 'Uploads';

type Props = {
  activeTab: PanelTabs | null;
};

const Panel: React.FC<Props> = ({ activeTab }) => {
  const renderPanel = () => {
    switch (activeTab) {
      case 'Shapes':
        return <ShapesPanel />;
      case 'Graphics':
        return <GraphicsPanel />;
      case 'Text':
        return <TextPanel />;
      case 'Generate':
        return <GeneratePanel />;
      case 'Uploads':
        return <UploadsPanel />;
      default:
        return null;
    }
  };

  return <StyledPanel>{renderPanel()}</StyledPanel>;
};

export default Panel;
