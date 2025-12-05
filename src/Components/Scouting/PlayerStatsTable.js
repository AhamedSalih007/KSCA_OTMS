import React, {useRef} from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import {WIDTH, HT} from '../../Constant/Dimensions';
import {bgColor, fontSize} from '../../Constant/Fonts&Colors';

const HEADER_HEIGHT = HT(4.5);
const ROW_HEIGHT = HT(6);

const PlayerStatsTable = ({
  data = [],
  overall,
  tab,
  onPressComp,
  hideOverall,
  modal,
}) => {
  const HEADER_TITLES_BAT = [
    'Inn',
    'R',
    'B',
    'Dis',
    'SR',
    'Avg',
    '4s',
    '6s',
    'Bd%',
    'Frm',
  ];

  const HEADER_TITLES_BOWL = [
    'Inn',
    'R',
    'B',
    'O',
    'Wkt',
    'SR',
    'Avg',
    'Econ',
    '4W',
    '5W',
    'Frm',
  ];

  const headerList = tab == 0 ? HEADER_TITLES_BAT : HEADER_TITLES_BOWL;

  const scrollRef = useRef(null);
  const scrollRowsRef = useRef([]); // Initialize list

  // Sync horizontal scroll for all rows including header
  const syncScroll = x => {
    scrollRef.current?.scrollTo({x, animated: false});

    if (!scrollRowsRef.current) return;

    scrollRowsRef.current.forEach(ref => {
      if (ref?.scrollTo) {
        ref.scrollTo({x, animated: false});
      }
    });
  };

  const renderRightRow = (item, index, isOverall = false) => {
    if (!item) return null;

    const vals = [
      item.innings,
      item.runs,
      item.balls,
      item.dismissals,
      item.sr,
      item.avg,
      item.fours,
      item.sixes,
      item.bdry != null ? `${item.bdry}%` : '0%',
      item.forms,
    ];
    const vals2 = [
      item.innings,
      item.runs,
      item.balls,
      item.overs,
      item.wkts,
      item.sr,
      item.avg,
      item.econ,
      item._4w,
      item._5w,
      item.forms,
    ];

    const values = tab == 0 ? vals : vals2;

    return (
      <ScrollView
        key={index}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        ref={ref => {
          scrollRowsRef.current[index] = ref;
        }}
        onScroll={e => {
          const x = e.nativeEvent.contentOffset.x;
          syncScroll(x);
        }}
        scrollEventThrottle={16}>
        <View style={[styles.rowRight, isOverall && styles.overallRow]}>
          {values.map((val, i) => (
            <Text
              key={i}
              style={[
                styles.cell,
                (i === 1 || i === 3) && styles.highlightCell,
                isOverall && styles.overallNumber,
              ]}>
              {val ?? 0}
            </Text>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {/* Full table wrapper vertical scroll */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row'}}>
          {/* LEFT FIXED COLUMN */}
          <View>
            {/* Top Header */}
            <View style={styles.leftHeaderRow}>
              <Text style={[styles.leftCell, styles.headerText]}>
                {modal ? 'Matches' : 'Competition'}
              </Text>
            </View>

            {/* Data */}
            {data.map((item, index) => (
              <Pressable
                onPress={() => onPressComp(item)}
                key={index}
                style={styles.leftRow}>
                <Text
                  style={[styles.leftCell, {textDecorationLine: 'underline'}]}>
                  {item.name}
                </Text>
              </Pressable>
            ))}

            {/* Overall */}
            {!hideOverall ? (
              <>
                {overall && (
                  <View style={[styles.leftRow, styles.overallRow]}>
                    <Text style={[styles.leftCell, styles.overallText]}>
                      OVERALL
                    </Text>
                  </View>
                )}
              </>
            ) : null}
          </View>

          {/* RIGHT SIDE - Shared H Scroll */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            ref={scrollRef}
            onScroll={e => {
              syncScroll(e.nativeEvent.contentOffset.x);
            }}
            scrollEventThrottle={16}>
            <View>
              {/* Header */}
              <View style={styles.rowRightHeader}>
                {headerList.map((title, idx) => (
                  <Text key={idx} style={[styles.cell, styles.headerText]}>
                    {title}
                  </Text>
                ))}
              </View>

              {/* Data Rows */}
              {data.map((item, index) => renderRightRow(item, index))}

              {/* Overall */}
              {!hideOverall ? (
                <>{overall && renderRightRow(overall, data.length, true)}</>
              ) : null}
            </View>
          </ScrollView>
        </View>
        <View style={{height: HT(70)}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgColor.white,
    borderRadius: 10,
    marginTop: HT(2),
    overflow: 'hidden',
  },

  /* Left */
  leftHeaderRow: {
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: bgColor.bg_globe,
  },

  leftRow: {
    height: ROW_HEIGHT,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  leftCell: {
    width: WIDTH * 0.35,
    paddingHorizontal: HT(2),
    fontSize: fontSize.verySmall,
    // fontWeight: '600',
    color: bgColor.black,
  },

  /* Right table */
  rowRightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: HEADER_HEIGHT,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: bgColor.bg_globe,
  },

  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ROW_HEIGHT,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  cell: {
    width: WIDTH * 0.16,
    textAlign: 'center',
    paddingHorizontal: 4,
    fontSize: fontSize.Small,
    color: '#333',
  },

  headerText: {
    fontWeight: '700',
    color: bgColor.black,
  },

  /* Styles */
  overallRow: {
    backgroundColor: bgColor.coloured,
  },

  overallText: {
    fontWeight: '700',
    color: bgColor.white,
  },

  highlightCell: {
    color: bgColor.coloured,
    fontWeight: '600',
  },

  overallNumber: {
    color: bgColor.white,
    fontWeight: '700',
  },
});

export default PlayerStatsTable;
