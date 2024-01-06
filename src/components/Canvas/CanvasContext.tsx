import { createContext, useContext } from 'react';

interface Context {
  canvas: fabric.Canvas | null;
}

// Create a context
const CanvasContext = createContext<Context>({
  canvas: null,
});

// Hook to use the canvas context
export const useCanvas = () => useContext(CanvasContext);
export const CanvasProvider = CanvasContext.Provider;
