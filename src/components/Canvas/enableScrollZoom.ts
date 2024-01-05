import { fabric } from 'fabric';
import { limitViewport } from './limitViewport';

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

    // Limit the viewport to the canvas size
    limitViewport(canvas);

    opt.e.preventDefault();
    opt.e.stopPropagation();
  });
};
