import { fabric } from 'fabric';
import { useEffect, useState } from 'react';
import { CIRCLE, FILL, LINE, RECTANGLE, STROKE, TEXT } from './defaultShapes';
import styled from 'styled-components';
import { drawGrid } from './drawGrid';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getDraggingSrc } from '../../redux/slices/editorSlice';

export interface FabricJSEditor {
  canvas: fabric.Canvas;
  addCircle: () => void;
  addRectangle: () => void;
  addLine: () => void;
  addText: (text: string) => void;
  updateText: (text: string) => void;
  deleteAll: () => void;
  deleteSelected: () => void;
  fillColor: string;
  strokeColor: string;
  setFillColor: (color: string) => void;
  setStrokeColor: (color: string) => void;
  zoomIn: () => void;
  zoomOut: () => void;
}

/**
 * Creates editor
 */
const buildEditor = (
  canvas: fabric.Canvas,
  fillColor: string,
  strokeColor: string,
  _setFillColor: (color: string) => void,
  _setStrokeColor: (color: string) => void,
  scaleStep: number
): FabricJSEditor => {
  return {
    canvas,
    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE,
        fill: fillColor,
        stroke: strokeColor,
      });
      canvas.add(object);
    },
    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE,
        fill: fillColor,
        stroke: strokeColor,
      });
      canvas.add(object);
    },
    addLine: () => {
      const object = new fabric.Line(LINE.points, {
        ...LINE.options,
        stroke: strokeColor,
      });
      canvas.add(object);
    },
    addText: (text: string) => {
      // use stroke in text fill, fill default is most of the time transparent
      const object = new fabric.Textbox(text, { ...TEXT, fill: strokeColor });
      object.set({ text: text });
      canvas.add(object);
    },
    updateText: (text: string) => {
      const objects: fabric.Object[] = canvas.getActiveObjects();
      if (objects.length === 1 && objects[0] instanceof fabric.Textbox) {
        const textObject: fabric.Textbox = objects[0];
        textObject.set({ text });
        canvas.renderAll();
      }
    },
    deleteAll: () => {
      canvas.getObjects().forEach((object) => canvas.remove(object));
      canvas.discardActiveObject();
      canvas.renderAll();
    },
    deleteSelected: () => {
      canvas.getActiveObjects().forEach((object) => canvas.remove(object));
      canvas.discardActiveObject();
      canvas.renderAll();
    },
    fillColor,
    strokeColor,
    setFillColor: (fill: string) => {
      _setFillColor(fill);
      canvas.getActiveObjects().forEach((object) => object.set({ fill }));
      canvas.renderAll();
    },
    setStrokeColor: (stroke: string) => {
      _setStrokeColor(stroke);
      canvas.getActiveObjects().forEach((object) => {
        if (object.type === TEXT.type) {
          // use stroke in text fill
          object.set({ fill: stroke });
          return;
        }
        object.set({ stroke });
      });
      canvas.renderAll();
    },
    zoomIn: () => {
      const zoom = canvas.getZoom();
      canvas.setZoom(zoom / scaleStep);
    },
    zoomOut: () => {
      const zoom = canvas.getZoom();
      canvas.setZoom(zoom * scaleStep);
    },
  };
};

interface FabricJSEditorState {
  editor: fabric.Canvas | null;
}

interface FabricJSEditorHook extends FabricJSEditorState {
  selectedObjects?: fabric.Object[];
  onReady: (canvas: fabric.Canvas) => void;
}

interface FabricJSEditorHookProps {
  defaultFillColor?: string;
  defaultStrokeColor?: string;
  scaleStep?: number;
}

const useFabricJSEditor = (
  props: FabricJSEditorHookProps = {}
): FabricJSEditorHook => {
  const scaleStep = props.scaleStep || 0.5;
  const { defaultFillColor, defaultStrokeColor } = props;
  const [canvas, setCanvas] = useState<null | fabric.Canvas>(null);
  const [fillColor, setFillColor] = useState<string>(defaultFillColor || FILL);
  const [strokeColor, setStrokeColor] = useState<string>(
    defaultStrokeColor || STROKE
  );
  const [selectedObjects, setSelectedObject] = useState<fabric.Object[]>([]);
  const draggingSrc = useAppSelector(getDraggingSrc);

  useEffect(() => {
    const bindEvents = (canvas: fabric.Canvas) => {
      canvas.on('selection:cleared', () => {
        setSelectedObject([]);
      });
      canvas.on('selection:created', (e) => {
        if (e.selected) {
          setSelectedObject(e.selected);
        }
      });
      canvas.on('selection:updated', (e) => {
        if (e.selected) {
          setSelectedObject(e.selected);
        }
      });
      canvas.on('drop', (e) => {
        if (!draggingSrc) {
          return;
        }

        const nativeEvent = e.e;
        const { offsetX, offsetY } = nativeEvent;

        fabric.loadSVGFromURL(draggingSrc, (objects, options) => {
          const obj = fabric.util.groupSVGElements(objects, options);
          obj.set({
            left: offsetX,
            top: offsetY,
            fill: fillColor,
            stroke: strokeColor,
          });
          canvas.add(obj);
          canvas.setActiveObject(obj);
          canvas.requestRenderAll();
        });
      });
      window.addEventListener('keydown', (e) => {
        const key = e.key;
        if (key === 'Delete' || key === 'Backspace') {
          canvas.getActiveObjects().forEach((object) => canvas.remove(object));
          canvas.discardActiveObject();
          canvas.renderAll();
        }
      });
    };
    if (canvas) {
      bindEvents(canvas);
    }

    return () => {
      if (canvas) {
        canvas.off('selection:cleared');
        canvas.off('selection:created');
        canvas.off('selection:updated');
        canvas.off('drop');
      }
    };
  }, [canvas, draggingSrc, fillColor, strokeColor]);

  return {
    selectedObjects,
    onReady: (canvasReady: fabric.Canvas): void => {
      console.log('Fabric canvas ready');
      setCanvas(canvasReady);
    },
    editor: canvas,
  };
};

export { buildEditor, useFabricJSEditor };
export type { FabricJSEditorHook };
