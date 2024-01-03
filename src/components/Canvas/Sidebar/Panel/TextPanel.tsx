import React from 'react';
import SectionHeader from './SectionHeader';
import PanelGrid from './PanelGrid';

const TextPanel: React.FC = () => {
  return (
    <>
      <SectionHeader title="Text" />
      <PanelGrid.Container columns={4}>
        <PanelGrid.Item src="/shapes/square.svg" alt="placeholder" />
        <PanelGrid.Item src="/shapes/circle.svg" alt="placeholder" />
        <PanelGrid.Item src="/shapes/triangle-eq.svg" alt="placeholder" />
        <PanelGrid.Item src="/shapes/pentagon.svg" alt="placeholder" />
        <PanelGrid.Item src="/shapes/hexagon.svg" alt="placeholder" />
        <PanelGrid.Item src="/shapes/heptagon.svg" alt="placeholder" />
        <PanelGrid.Item src="/shapes/octagon.svg" alt="placeholder" />
        <PanelGrid.Item src="/shapes/nonagon.svg" alt="placeholder" />
        <PanelGrid.Item src="/shapes/decagon.svg" alt="placeholder" />
        <PanelGrid.Item src="/shapes/star-5.svg" alt="placeholder" />
        <PanelGrid.Item src="/shapes/star-10.svg" alt="placeholder" />
      </PanelGrid.Container>
    </>
  );
};

export default TextPanel;
