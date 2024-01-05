import { fabric } from 'fabric';

/**
 * Limits the viewport to the canvas size to prevent the user from panning
 * or scrolling outside the canvas.
 */
export const limitViewport = (canvas: fabric.Canvas) => {
  const vpt = canvas.viewportTransform;

  if (!vpt) {
    return;
  }

  // Limit panning to left and top
  vpt[4] = Math.min(0, vpt[4]);
  vpt[5] = Math.min(0, vpt[5]);

  // Calculate the zoomed dimensions of the canvas
  const zoom = canvas.getZoom();
  const zoomedWidth = canvas.getWidth() * zoom;
  const zoomedHeight = canvas.getHeight() * zoom;

  // Calculate the maximum allowable translations
  const maxX = canvas.getWidth() - zoomedWidth;
  const maxY = canvas.getHeight() - zoomedHeight;

  vpt[4] = Math.max(maxX, vpt[4]);
  vpt[5] = Math.max(maxY, vpt[5]);
};
