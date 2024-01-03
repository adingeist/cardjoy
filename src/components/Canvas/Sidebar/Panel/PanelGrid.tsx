import React from 'react';
import styled from 'styled-components';
import { PANEL_PADDING } from '../../../../theme';

interface PanelGridProps {
  columns?: number;
  children: React.ReactNode;
}

interface PanelGridItemProps {
  src: string;
  alt: string;
}

const GridContext = React.createContext({
  columns: 4,
});

export const useGridContext = () => React.useContext(GridContext);

const StyledPanelGrid = styled.div`
  width: 320px;
  background-color: ${({ theme }) => theme.palette.grey[800]};
  display: flex;
  flex-wrap: wrap;
  padding: ${PANEL_PADDING};
`;

const PanelGridContainer: React.FC<PanelGridProps> = ({
  children,
  columns = 4,
}) => {
  return (
    <GridContext.Provider value={{ columns }}>
      <StyledPanelGrid>{children}</StyledPanelGrid>
    </GridContext.Provider>
  );
};

const StyledPanelItem = styled.img`
  cursor: pointer;
  transition: filter 0.3s ease;

  &:hover {
    filter: brightness(60%);
  }
`;

const PanelGridItem: React.FC<PanelGridItemProps> = ({ src, alt }) => {
  const { columns } = useGridContext();

  return (
    <StyledPanelItem
      src={src}
      alt={alt}
      style={{
        marginRight: `${columns}px`,
        marginLeft: `${columns}px`,
        marginBottom: `${columns}px`,
        width: `${(4 / columns) * 70}px`,
        height: `${(4 / columns) * 70}px`,
      }}
    />
  );
};

export default {
  Container: PanelGridContainer,
  Item: PanelGridItem,
};
