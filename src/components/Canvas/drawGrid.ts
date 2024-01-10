import { fabric } from 'fabric';

export const drawGrid = (
  canvas: fabric.Canvas,
  color: string,
  gridSize = 30
) => {
  const width = canvas.getWidth();
  const height = canvas.getHeight();
  for (let i = 0; i < width / gridSize; i++) {
    canvas.add(
      new fabric.Line([i * gridSize, 0, i * gridSize, height], {
        stroke: color,
        selectable: false,
        hoverCursor: 'default',
      })
    );
    canvas.add(
      new fabric.Line([0, i * gridSize, width, i * gridSize], {
        stroke: color,
        selectable: false,
        hoverCursor: 'default',
      })
    );
  }
};
