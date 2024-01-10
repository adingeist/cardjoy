// Enables dropping objects onto the canvas by an SVG source.
// Uses the state of the editor to determine which object to add.
import { fabric } from 'fabric';
import { useEditor } from './EditorContext';

export const useEnableDrop = () => {
  const { editor } = useEditor();

  const enableDrop = (canvas: fabric.Canvas) => {
    if (!editor) return;
  };

  return { enableDrop };
};
