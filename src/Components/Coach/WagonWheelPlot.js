import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Path, Circle, Text as SvgText, Rect, Line} from 'react-native-svg';
import {WD} from '../../Constant/Dimensions';

const WagonWheelPlot = ({balls = []}) => {
  const size = WD(90);
  const radius = size / 2;
  const cx = size / 2;
  const cy = size / 2;

  // Counts per WWRegion_5
  const counts = [0, 0, 0, 0, 0];

  balls.forEach(b => {
    if (b.WWRegion_5 >= 1 && b.WWRegion_5 <= 5) {
      // console.log('region', b.WWRegion_5);
      counts[b.WWRegion_5 - 1]++;
    }
  });

  console.log('counts', counts);

  const total = counts.reduce((a, b) => a + b, 0);
  const pct = counts.map(v => (total ? Math.round((v / total) * 100) : 0));

  const sortedIndex = [...pct]
    .map((p, i) => ({p, i}))
    .sort((a, b) => b.p - a.p)
    .map(obj => obj.i);

  const dynamicShades = [
    '#3D7C38', // rank 1
    '#5F9858', // rank 2
    '#8FB77F', // rank 3
    '#BFD9AB', // rank 4
    '#DCE9CC', // rank 5
  ];

  const phaseColors = Array(5);
  sortedIndex.forEach((phaseIdx, rank) => {
    phaseColors[phaseIdx] = dynamicShades[rank];
  });

  // Sector angles mapping (clockwise from top)
  const ANGLES = [
    // Upper Left
    {phase: 1, start: -90, sweep: 90}, // Upper Right
    {phase: 2, start: 0, sweep: 60}, // Lower Right
    {phase: 3, start: 60, sweep: 70}, // Lower Bottom Center
    {phase: 4, start: 120, sweep: 60}, // Lower Left
    {phase: 5, start: 180, sweep: 90},
  ];

  const phaseToIndex = phase => phase - 1;

  const sectorColors = [
    '#8EBB72', // Phase 5
    '#A6CD8A', // Phase 1
    '#C7E0A9', // Phase 2
    '#D9E9C3', // Phase 3
    '#BAD496', // Phase 4
  ];

  const degToRad = deg => (deg * Math.PI) / 180;

  const createSectorPath = (startDeg, sweepDeg) => {
    const start = degToRad(startDeg);
    const end = degToRad(startDeg + sweepDeg);

    const x1 = cx + radius * Math.cos(start);
    const y1 = cy + radius * Math.sin(start);
    const x2 = cx + radius * Math.cos(end);
    const y2 = cy + radius * Math.sin(end);

    return `
      M ${cx} ${cy}
      L ${x1} ${y1}
      A ${radius} ${radius} 0 ${sweepDeg > 180 ? 1 : 0} 1 ${x2} ${y2}
      Z
    `;
  };

  const labelPosition = (startDeg, sweepDeg) => {
    const mid = degToRad(startDeg + sweepDeg / 2);
    return {
      x: cx + radius * 0.55 * Math.cos(mid),
      y: cy + radius * 0.55 * Math.sin(mid),
    };
  };

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Outer dashed boundary */}
        <Circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="#F1F4F0"
          stroke="#B3B3B3"
          strokeDasharray="8,6"
          strokeWidth={3}
        />

        {/* Segments */}
        {ANGLES.map((s, i) => {
          const index = phaseToIndex(s.phase);
          return (
            <Path
              key={`seg-${i}`}
              d={createSectorPath(s.start, s.sweep)}
              fill={phaseColors[index]}
              stroke="#FFFFFF"
              strokeWidth={2}
            />
          );
        })}

        {/* Segment Division Lines (like screenshot) */}
        {ANGLES.map((s, i) => {
          const start = degToRad(s.start);
          const x = cx + radius * Math.cos(start);
          const y = cy + radius * Math.sin(start);
          return (
            <Line
              key={`line-${i}`}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="#C4C4C4"
              strokeWidth={2}
            />
          );
        })}

        {/* Percent Labels */}
        {ANGLES.map((s, i) => {
          const idx = phaseToIndex(s.phase);
          const {x, y} = labelPosition(s.start, s.sweep);
          return (
            <SvgText
              key={`pct-${i}`}
              x={x}
              y={y + 7}
              fontSize={22}
              fill="#000"
              fontWeight="bold"
              textAnchor="middle">
              {pct[idx]}%
            </SvgText>
          );
        })}

        {/* Stumps in Middle */}
        <Rect
          x={cx - 10}
          y={cy - 35}
          width={20}
          height={70}
          fill="#B0896A"
          rx={3}
        />

        {/* <Rect
          x={cx - 10}
          y={cy - 35}
          width={20}
          height={70}
          stroke="#FFFFFF"
          strokeDasharray="6,4"
          strokeWidth={2}
          rx={3}
        /> */}

        {/* Bails */}
        <Rect x={cx - 10} y={cy - 35} width={20} height={6} fill="#FFFFFF" />
        <Rect x={cx - 10} y={cy + 29} width={20} height={6} fill="#FFFFFF" />
      </Svg>
    </View>
  );
};

export default WagonWheelPlot;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
