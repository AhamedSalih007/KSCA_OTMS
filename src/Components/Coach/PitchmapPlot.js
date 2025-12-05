import React, {useEffect, useState} from 'react';
import {View, Dimensions} from 'react-native';
import Svg, {Rect, Line, Circle, Text, G} from 'react-native-svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {useCallback} from 'react';

import axios from 'axios';
import {HT, WD} from '../../Constant/Dimensions';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const PitchMap = ({ballData}) => {
  const PM_WIDTH = 276;
  const PM_HEIGHT = 594;
  const PITCH_WIDTH = 274;
  const PITCH_LENGTH = 1450;

  // From web code: viewBox is "-158 -20.79 297 594"
  // But we need to adjust coordinates so everything fits
  const VIEWBOX_X = 0;
  const VIEWBOX_Y = 0;
  const VIEWBOX_WIDTH = WD(75);
  const VIEWBOX_HEIGHT = HT(78); // From original SVG height

  // Scale factors (same as web)
  const scaling_x = PM_WIDTH / PITCH_WIDTH;
  const scaling_y = PM_HEIGHT / PITCH_LENGTH;

  // Run colors mapping (from web)
  const runColors = {
    0: '#000000',
    1: '#E8BF09',
    2: '#1C8EEE',
    3: '#38C500',
    4: '#00068D',
    5: '#DA6E00',
    6: '#DE1623',
  };

  // Convert ball data to SVG coordinates
  const getBallPosition = ball => {
    // Original web calculation: v.LengthX_CM * scaling_x
    const pitchReg_x = ball.LengthX_CM * scaling_x;
    let pitchReg_y = ball.LengthY_CM * scaling_y;

    // From web: svg.setAttribute("viewBox", -158 -20.79 297 594);
    // This means we need to offset by 158 to the right
    const offsetX = 158;
    const offsetY = 20.79;

    // Apply offsets to match web positioning
    const adjustedX = pitchReg_x + offsetX;
    const adjustedY = pitchReg_y + offsetY;

    return {
      cx: adjustedX,
      cy: adjustedY,
      color: runColors[ball.Runs] || '#000000',
    };
  };

  return (
    <View style={{width: windowWidth * 0.9, height: windowHeight * 0.65}}>
      <Svg
        width="100%"
        height="100%"
        viewBox={`${VIEWBOX_X} ${VIEWBOX_Y} ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet">
        {/* Apply transform similar to web: translate(0, 0) */}
        <G transform="translate(0, 0)">
          {/* Shade sections - adjusted to match web coordinates */}
          <G id="Shade">
            <Rect y="39.8" width="296.4" height="84.2" fill="#fff" />
            <Rect y="123" width="296.4" height="84.2" fill="#fff" />
            <Rect y="207.2" width="296.4" height="85.2" fill="#fff" />
            <Rect y="292.3" width="296.4" height="86.2" fill="#fff" />
            <Rect y="377.4" width="296.4" height="84.2" fill="#fff" />
            <Rect y="461.5" width="296.4" height="132.5" fill="#fff" />
          </G>

          {/* Border */}
          <Rect
            x="0"
            y="0"
            stroke="#d3d3d3"
            fill="none"
            strokeWidth="1"
            width="296"
            height="594"
          />

          {/* Vertical dashed lines (red) */}
          <Line
            x1="136.53"
            y1="39.83"
            x2="136.53"
            y2="590.04"
            stroke="#ed1c24"
            strokeDasharray="4"
            strokeMiterlimit="10"
          />
          <Line
            x1="147.93"
            y1="39.83"
            x2="147.93"
            y2="590.04"
            stroke="#ed1c24"
            strokeDasharray="4"
            strokeMiterlimit="10"
          />
          <Line
            x1="159.38"
            y1="39.83"
            x2="159.38"
            y2="590.04"
            stroke="#ed1c24"
            strokeDasharray="4"
            strokeMiterlimit="10"
          />

          {/* Top horizontal line */}
          <Line
            x1="18.26"
            y1="39.49"
            x2="278"
            y2="39.49"
            stroke="#231f20"
            strokeWidth="0.5"
            strokeMiterlimit="10"
          />

          {/* Vertical boundaries */}
          <Line
            x1="277.34"
            y1="0"
            x2="277.34"
            y2="89.5546"
            stroke="#231f20"
            strokeWidth="0.5"
            strokeMiterlimit="10"
          />
          <Line
            x1="0.08"
            y1="89.5546"
            x2="297.48"
            y2="89.5546"
            stroke="#231f20"
            strokeWidth="0.5"
            strokeMiterlimit="10"
          />
          <Line
            x1="17.94"
            y1="0"
            x2="17.94"
            y2="89.5546"
            stroke="#231f20"
            strokeWidth="0.5"
            strokeMiterlimit="10"
          />

          {/* Horizontal dashed lines (gray) */}
          {[122.65, 207.51, 292.37, 377.23, 462.09, 589.38].map((y, index) => (
            <Line
              key={`line-${index}`}
              x1="0"
              y1={y}
              x2="296.4"
              y2={y}
              stroke="#6d6e71"
              strokeDasharray="4 4"
              strokeMiterlimit="10"
            />
          ))}

          {/* Small rectangles at top */}
          <Rect x="135.3" y="37.79" width="5.53" height="3.7" fill="#58595b" />
          <Rect x="145.6" y="37.79" width="5.53" height="3.7" fill="#58595b" />
          <Rect x="154.7" y="37.79" width="5.53" height="3.7" fill="#58595b" />

          {/* Distance labels */}
          <Text
            x="266"
            y="117.65"
            fontSize="13"
            fill="#808285"
            fontWeight="bold">
            2m
          </Text>
          <Text
            x="266"
            y="202.51"
            fontSize="13"
            fill="#808285"
            fontWeight="bold">
            4m
          </Text>
          <Text
            x="266"
            y="287.37"
            fontSize="13"
            fill="#808285"
            fontWeight="bold">
            6m
          </Text>
          <Text
            x="266"
            y="372.23"
            fontSize="13"
            fill="#808285"
            fontWeight="bold">
            8m
          </Text>
          <Text
            x="266"
            y="457.09"
            fontSize="13"
            fill="#808285"
            fontWeight="bold">
            10m
          </Text>
          <Text
            x="266"
            y="584.38"
            fontSize="13"
            fill="#808285"
            fontWeight="bold">
            13m
          </Text>

          {/* Render balls */}
          {ballData?.map((ball, index) => {
            const position = getBallPosition(ball);
            return (
              <Circle
                key={`ball-${index}`}
                cx={position.cx}
                cy={position.cy}
                r="5"
                fill={position.color}
                stroke="#fff"
                strokeWidth="0.5"
                // onPress={() => onBallPress && onBallPress(ball)}
              />
            );
          })}
        </G>
      </Svg>
    </View>
  );
};

// Main screen component
const PitchMapScreen = ({balls}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        top: HT(4),
      }}>
      <PitchMap ballData={balls} />
    </View>
  );
};

export default PitchMapScreen;
