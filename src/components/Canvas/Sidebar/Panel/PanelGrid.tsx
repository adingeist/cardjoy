import React, { DragEventHandler, useCallback } from 'react';
import styled from 'styled-components';
import { PANEL_PADDING } from '../../../../theme';
import { useEditor } from '../../EditorContext';
import { fabric } from 'fabric';
import { useAppDispatch } from '../../../../hooks/useAppSelector';
import { setDraggingSrc } from '../../../../redux/slices/editorSlice';

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
  const { editor } = useEditor();
  const dispatch = useAppDispatch();

  const addShape = useCallback(() => {
    if (!editor) return;
    fabric.loadSVGFromURL(src, (objects, options) => {
      const obj = fabric.util.groupSVGElements(objects, options);
      obj.set({
        left: editor.getWidth() / 2,
        top: editor.getHeight() / 2,
      });
      editor.add(obj);
      editor.setActiveObject(obj);
      editor.requestRenderAll();
    });
  }, [editor, src]);

  const handleDragStart: DragEventHandler = useCallback(
    (e) => {
      dispatch(setDraggingSrc(src));
    },
    [dispatch, src]
  );

  const handleDragEnd: DragEventHandler = useCallback(
    (e) => {
      dispatch(setDraggingSrc(null));
    },
    [dispatch]
  );

  return (
    <StyledPanelItem
      draggable
      src={src}
      alt={alt}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={addShape}
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
