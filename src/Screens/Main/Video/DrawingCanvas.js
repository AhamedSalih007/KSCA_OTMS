import React, {useState, useRef, useMemo, useCallback, useEffect} from 'react';
import {View, PanResponder, Button} from 'react-native';
import {Canvas, Group, Path, Skia} from '@shopify/react-native-skia';
import CanvasBottomView from '../../../Components/Video/CanvasBottomView';
import {fontSize} from '../../../Constant/Fonts&Colors';

const ShapeType = {
  FREEHAND: 1,
  STRAIGHT_LINE: 2,
  RECTANGLE: 7,
  CIRCLE: 6,
  ARROW_UP: 3,
  XMARK: 4,
  ERASER: 5,
  CANCEL: 8,
};

const buildPath = points => {
  const path = Skia.Path.Make();
  if (points.length > 0) path.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) path.lineTo(points[i].x, points[i].y);
  return path;
};

const DrawingCanvas = ({
  color,
  alpha = 1,
  mode,
  isCapture,
  fullScreen,
  handleFullScreen,
  updateFrameImage,
  inst,
}) => {
  const [shapes, setShapes] = useState([]);
  const [currentShape, setCurrentShape] = useState(null);
  const redoStack = useRef([]);

  useEffect(() => {
    // console.log('inst', inst);
    if (inst != null) {
      if (inst == 'undo') {
        undo();
      } else if (inst == 'redo') {
        redo();
      }
      // Clean
      else {
        setShapes([]);
        updateFrameImage();
      }
    }
  }, [isCapture]);

  //  Undo function
  const undo = useCallback(() => {
    setShapes(prev => {
      if (prev.length === 0) return prev;
      const newShapes = [...prev];
      const popped = newShapes.pop();
      redoStack.current.push(popped);
      return newShapes;
    });
    updateFrameImage();
  }, []);

  // Redo function
  const redo = useCallback(() => {
    if (redoStack.current.length === 0) return;
    const shape = redoStack.current.pop();
    setShapes(prev => [...prev, shape]);
    updateFrameImage();
  }, []);

  // Recreate PanResponder whenever `color` or `mode` changes
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: e => {
          const {locationX, locationY} = e.nativeEvent;
          const startPoint = {x: locationX, y: locationY};

          const newShape = {
            type: mode,
            points: [startPoint],
            color,
            alpha,
          };
          setCurrentShape(newShape);
        },

        onPanResponderMove: e => {
          const {locationX, locationY} = e.nativeEvent;
          const newPoint = {x: locationX, y: locationY};

          setCurrentShape(prev => {
            if (!prev) return null;
            const updatedPoints = [...prev.points];
            if (
              prev.type === ShapeType.FREEHAND ||
              prev.type === ShapeType.ERASER
            ) {
              updatedPoints.push(newPoint);
            } else {
              updatedPoints[1] = newPoint;
            }
            return {...prev, points: updatedPoints};
          });
        },

        onPanResponderRelease: () => {
          setCurrentShape(prevShape => {
            if (!prevShape) return null;
            setShapes(prevShapes => [...prevShapes, prevShape]);
            redoStack.current = [];
            return null;
          });

          updateFrameImage();
        },
      }),
    [color, mode],
  );

  const renderArrow = (shape, i) => {
    if (shape.points.length < 2) return null;
    const [start, end] = shape.points;
    const arrowPath = Skia.Path.Make();
    arrowPath.moveTo(start.x, start.y);
    arrowPath.lineTo(end.x, end.y);

    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    const size = fontSize.Medium;
    const left = {
      x: end.x - size * Math.cos(angle - Math.PI / 6),
      y: end.y - size * Math.sin(angle - Math.PI / 6),
    };
    const right = {
      x: end.x - size * Math.cos(angle + Math.PI / 6),
      y: end.y - size * Math.sin(angle + Math.PI / 6),
    };

    arrowPath.moveTo(end.x, end.y);
    arrowPath.lineTo(left.x, left.y);
    arrowPath.moveTo(end.x, end.y);
    arrowPath.lineTo(right.x, right.y);

    return (
      <Path
        key={i}
        path={arrowPath}
        color={shape.color}
        strokeWidth={3}
        style="stroke"
      />
    );
  };

  const renderShape = (shape, i) => {
    const path = buildPath(shape.points);

    const baseProps = {
      key: i,
      path: path,
      strokeWidth:
        shape.type === ShapeType.ERASER ? fontSize.Large : fontSize.verySmall, // thicker for eraser
      style: 'stroke',
      strokeJoin: 'round',
      strokeCap: 'round',
    };

    switch (shape.type) {
      case ShapeType.ERASER:
        return <Path {...baseProps} blendMode="clear" color="transparent" />;

      case ShapeType.FREEHAND:
      case ShapeType.STRAIGHT_LINE:
        return (
          <Path
            {...baseProps}
            color={shape.color}
            opacity={shape.alpha}
            blendMode={shape.type === ShapeType.ERASER ? 'clear' : 'srcOver'}
          />
        );

      case ShapeType.RECTANGLE: {
        const [start, end] = shape.points;
        if (!start || !end) return null;
        const rect = Skia.Path.Make();
        rect.addRect({
          x: Math.min(start.x, end.x),
          y: Math.min(start.y, end.y),
          width: Math.abs(end.x - start.x),
          height: Math.abs(end.y - start.y),
        });
        return (
          <Path
            key={i}
            path={rect}
            color={shape.color}
            strokeWidth={3}
            style="stroke"
            blendMode={shape.type === ShapeType.ERASER ? 'clear' : 'srcOver'}
          />
        );
      }

      case ShapeType.CIRCLE: {
        const [start, end] = shape.points;
        if (!start || !end) return null;

        // Calculate center as midpoint
        const centerX = (start.x + end.x) / 2;
        const centerY = (start.y + end.y) / 2;

        // Calculate radius as distance from center to one of the points
        const radius = Math.hypot(end.x - start.x, end.y - start.y) / 2;

        const circle = Skia.Path.Make();
        circle.addCircle(centerX, centerY, radius);

        return (
          <Path
            key={i}
            path={circle}
            color={shape.color}
            strokeWidth={3}
            style="stroke"
            blendMode={shape.type === ShapeType.ERASER ? 'clear' : 'srcOver'}
          />
        );
      }

      case ShapeType.ARROW_UP:
        return renderArrow(shape, i);

      default:
        return null;
    }
  };

  return (
    <View
      {...panResponder.panHandlers}
      style={{width: '100%', height: '100%', backgroundColor: 'transparent'}}>
      <Canvas style={{flex: 1}}>
        <Group blendMode="srcOver" layer>
          {shapes.map((s, i) => renderShape(s, i))}
          {currentShape && renderShape(currentShape, 'current')}
        </Group>
      </Canvas>

      {/* Bottom View */}
      {/* {!isCapture ? (
        <CanvasBottomView
          onPress={id => onPressedBottomBtn(id)}
          fullScreen={fullScreen}
        />
      ) : null} */}
    </View>
  );
};

export default DrawingCanvas;
