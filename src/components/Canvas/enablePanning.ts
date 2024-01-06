import { useRef } from 'react';
import { limitViewport } from './limitViewport';

const usePanning = () => {
  const isPanningRef = useRef(false);
  const initialTouchXY = useRef({ x: 0, y: 0 });

  const enablePanning = (canvas: fabric.Canvas) => {
    // Handle the mouse down event
    canvas.on('mouse:down', (opt) => {
      const evt = opt.e;
      isPanningRef.current = true;
      initialTouchXY.current = {
        x: evt.clientX,
        y: evt.clientY,
      };
      canvas.selection = false; // Disable object selection when panning
    });

    canvas.on('mouse:move', (opt) => {
      if (isPanningRef.current) {
        const e = opt.e;
        const vpt = canvas.viewportTransform!;

        // Calculate the changes in x and y positions
        const dx = e.clientX - initialTouchXY.current.x;
        const dy = e.clientY - initialTouchXY.current.y;

        // Update the viewport position with these changes
        vpt[4] += dx;
        vpt[5] += dy;

        // Limit viewport to the canvas size
        limitViewport(canvas);

        canvas.requestRenderAll();
        initialTouchXY.current = {
          x: e.clientX,
          y: e.clientY,
        };
      }
    });

    // Handle the mouse up event
    canvas.on('mouse:up', () => {
      isPanningRef.current = false;
      canvas.selection = true; // Re-enable object selection after panning
    });
  };

  return { enablePanning };
};

export default usePanning;
