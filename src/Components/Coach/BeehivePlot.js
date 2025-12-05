import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Line, Rect, Circle, Text as SvgText} from 'react-native-svg';
import {HT, WD} from '../../Constant/Dimensions';
import {bgColor} from '../../Constant/Fonts&Colors';

// Pass balls as props for flexibility
const BeehivePlot = ({balls}) => {
  const width = WD(95);
  const height = HT(60);

  const paddingLeft = 50;
  const paddingRight = 50;
  const paddingTop = 40;
  const paddingBottom = 40;

  const plotWidth = width - paddingLeft - paddingRight;
  const plotHeight = height - paddingTop - paddingBottom;

  // Cricket beehive scale
  const X_MIN = -88;
  const X_MAX = 88;
  const Y_MIN = 0;
  const Y_MAX = 170;

  const X_TICKS = [-88, -34, 34, 88];
  const Y_TICKS = [35, 70, 170];

  const mapX = x => paddingLeft + ((x - X_MIN) / (X_MAX - X_MIN)) * plotWidth;

  const mapY = y =>
    paddingTop + plotHeight - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * plotHeight;

  // Only balls having HeightX_CM & HeightY_CM
  const validBalls = balls.filter(
    b => b.HeightX_CM != null && b.HeightY_CM != null,
  );

  // Ground baseline (CM=0)
  const groundY = mapY(0);

  // Real cricket stump visuals
  const stumpHeightCM = 71; // approx stump visible height
  const stumpTopY = mapY(stumpHeightCM);

  const stumpWidth = 4;
  const stumpGap = 10;
  const midX = mapX(0);

  const stumpPositions = [
    midX - stumpWidth - stumpGap, // left stump
    midX,
    midX + stumpWidth + stumpGap, // right stump
  ];

  // Bail settings
  const bailThickness = 4;
  const bailLength = stumpWidth * 2 + stumpGap;
  const bailY = stumpTopY - bailThickness;

  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        {/* Background */}
        <Rect width={width} height={height} fill={bgColor.white} />

        {/* Vertical dashed grid lines */}
        {X_TICKS.map((tick, i) => (
          <Line
            key={i}
            x1={mapX(tick)}
            y1={paddingTop}
            x2={mapX(tick)}
            y2={paddingTop + plotHeight}
            stroke="#9D9D9D"
            strokeDasharray="5,5"
            strokeWidth={1.4}
          />
        ))}

        {/* Outer dashed side lines */}
        <Line
          x1={paddingLeft}
          y1={paddingTop}
          x2={paddingLeft}
          y2={paddingTop + plotHeight}
          stroke="#9D9D9D"
          strokeDasharray="5,5"
          strokeWidth={1.4}
        />
        <Line
          x1={width - paddingRight}
          y1={paddingTop}
          x2={width - paddingRight}
          y2={paddingTop + plotHeight}
          stroke="#9D9D9D"
          strokeDasharray="5,5"
          strokeWidth={1.4}
        />

        {/* Horizontal light guide lines */}
        {Y_TICKS.map((tick, i) => (
          <Line
            key={'y' + i}
            x1={paddingLeft}
            y1={mapY(tick)}
            x2={width - paddingRight}
            y2={mapY(tick)}
            stroke="#D0D0D0"
            strokeWidth={1.1}
          />
        ))}

        {/* === NEW: BAILS === */}
        <Rect
          x={stumpPositions[0]}
          y={bailY}
          width={bailLength}
          height={bailThickness}
          fill="#696969"
          rx={2}
        />
        <Rect
          x={stumpPositions[1]}
          y={bailY}
          width={bailLength}
          height={bailThickness}
          fill="#696969"
          rx={2}
        />

        {/* Stumps */}
        {stumpPositions.map((x, i) => (
          <Rect
            key={'stump' + i}
            x={x}
            y={stumpTopY}
            width={stumpWidth}
            height={groundY - stumpTopY}
            rx={1.5}
            fill="#AFAFAF"
            stroke="#5A5A5A"
            strokeWidth={1.3}
          />
        ))}

        {/* Balls */}
        {validBalls.map((b, i) => (
          <Circle
            key={i}
            cx={mapX(b.HeightX_CM)}
            cy={mapY(b.HeightY_CM)}
            r={5}
            fill="#000"
            stroke={bgColor.white}
            strokeWidth={1}
          />
        ))}

        {/* Ground baseline */}
        <Line
          x1={paddingLeft}
          y1={groundY}
          x2={width - paddingRight}
          y2={groundY}
          stroke="#494949"
          strokeWidth={4}
        />

        {/* X-axis labels */}
        {X_TICKS.map((tick, idx) => (
          <SvgText
            key={'xt' + idx}
            x={mapX(tick)}
            y={groundY + 20}
            fontSize={14}
            fontWeight="bold"
            textAnchor="middle"
            fill="#000">
            {tick}
          </SvgText>
        ))}

        <SvgText
          x={width - paddingRight + 20}
          y={groundY + 20}
          fontSize={13}
          fontWeight="bold"
          fill="#000">
          CM
        </SvgText>

        {/* Y-axis labels */}
        {Y_TICKS.map((tick, idx) => (
          <SvgText
            key={'yt' + idx}
            x={width - paddingRight + 20}
            y={mapY(tick) + 5}
            fontSize={13}
            fontWeight="bold"
            fill="#000">
            {tick}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
};

export default BeehivePlot;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
