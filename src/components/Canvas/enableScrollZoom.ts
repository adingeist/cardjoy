import { fabric } from 'fabric';

/**
 * Limits the viewport to the canvas size to prevent the user from scrolling
 * outside the canvas.
 */
const limitViewport = (canvas: fabric.Canvas) => {
  const width = canvas.getWidth();
  const height = canvas.getHeight();
  const zoom = canvas.getZoom();
  const xMin = (width - width * zoom) / 2;
  const xMax = (width * zoom - width) / 2;
  const yMin = (height - height * zoom) / 2;
  const yMax = (height * zoom - height) / 2;

  const viewportTransform = canvas.viewportTransform;

  if (!viewportTransform) {
    return;
  }

  // Limit x and y to prevent the user from scrolling outside the canvas
  // viewportTransform[4] is x, viewportTransform[5] is y
  viewportTransform[4] = Math.min(xMax, Math.max(viewportTransform[4], xMin));
  viewportTransform[5] = Math.min(yMax, Math.max(viewportTransform[5], yMin));
  canvas.setViewportTransform(viewportTransform);
};

/**
 * Enables zooming with the mouse wheel.
 */
export const enableScrollZoom = (canvas: fabric.Canvas) => {
  canvas.on('mouse:wheel', function (opt) {
    // Get the delta from the mouse wheel
    const delta = opt.e.deltaY;
    let zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 1) zoom = 1;

    // Get the point under the mouse
    const pointer = canvas.getPointer(opt.e);
    const point = { x: pointer.x, y: pointer.y };

    // Calculate zoom values around the cursor
    const zoomPoint = new fabric.Point(point.x, point.y);
    canvas.zoomToPoint(zoomPoint, zoom);
    limitViewport(canvas);

    opt.e.preventDefault();
    opt.e.stopPropagation();
  });
};
