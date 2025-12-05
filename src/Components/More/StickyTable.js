import React, {useRef} from 'react';
import {View, Text, ScrollView, StyleSheet, Pressable} from 'react-native';
import {Dimensions} from 'react-native';
import {bgColor} from '../../Constant/Fonts&Colors';

const {width, height} = Dimensions.get('window');
const TABLE_WIDTH = width * 0.95;
const TABLE_HEIGHT = height * 0.55;
const ROW_HEIGHT = 45;
const HEADER_HEIGHT = 50;
const FIXED_COL_WIDTH = 130;
const CELL_WIDTH = 120;

const StickyTable = ({data = [], hiddenKeys = [], firstcol, onPressPlayer}) => {
  if (!data || data.length === 0) return null;

  // keys to show
  const allKeys = Object.keys(data[0]).filter(k => !hiddenKeys.includes(k));
  const firstColKey = firstcol;
  const otherKeys = allKeys.filter(k => k !== firstColKey);

  // refs for syncing
  const headerHorizontalRef = useRef(null);
  const bodyHorizontalRef = useRef(null);
  const leftVerticalRef = useRef(null);
  const rightVerticalRef = useRef(null);

  // guard refs to prevent circular sync loops
  const horizSyncing = useRef(false);
  const vertSyncing = useRef(false);

  // Calculate exact dimensions
  const totalBodyHeight = data.length * ROW_HEIGHT;
  const scrollableWidth = otherKeys.length * CELL_WIDTH;

  // horizontal onScroll handlers
  const onHeaderHorizontalScroll = e => {
    if (horizSyncing.current || !bodyHorizontalRef.current) return;
    horizSyncing.current = true;
    const x = e.nativeEvent.contentOffset.x;
    bodyHorizontalRef.current.scrollTo({x, animated: false});
    setTimeout(() => {
      horizSyncing.current = false;
    }, 0);
  };

  const onBodyHorizontalScroll = e => {
    if (horizSyncing.current || !headerHorizontalRef.current) return;
    horizSyncing.current = true;
    const x = e.nativeEvent.contentOffset.x;
    headerHorizontalRef.current.scrollTo({x, animated: false});
    setTimeout(() => {
      horizSyncing.current = false;
    }, 0);
  };

  // vertical onScroll handlers
  const onLeftVerticalScroll = e => {
    if (vertSyncing.current || !rightVerticalRef.current) return;
    vertSyncing.current = true;
    const y = e.nativeEvent.contentOffset.y;
    rightVerticalRef.current.scrollTo({y, animated: false});
    setTimeout(() => {
      vertSyncing.current = false;
    }, 0);
  };

  const onRightVerticalScroll = e => {
    if (vertSyncing.current || !leftVerticalRef.current) return;
    vertSyncing.current = true;
    const y = e.nativeEvent.contentOffset.y;
    leftVerticalRef.current.scrollTo({y, animated: false});
    setTimeout(() => {
      vertSyncing.current = false;
    }, 0);
  };

  return (
    <View style={styles.container}>
      {/* Header Row - Fixed first column + Scrollable headers */}
      <View style={styles.headerRow}>
        {/* Fixed first column header */}
        <View
          style={[
            styles.fixedColHeader,
            styles.headerCell,
            {backgroundColor: bgColor.coloured},
          ]}>
          <Text style={styles.headerText}>{firstColKey}</Text>
        </View>

        {/* Scrollable headers */}
        <ScrollView
          horizontal
          ref={headerHorizontalRef}
          onScroll={onHeaderHorizontalScroll}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          style={styles.headerScrollView}>
          <View style={[styles.headerScrollContent, {width: scrollableWidth}]}>
            {otherKeys.map((k, index) => (
              <View
                key={k}
                style={[
                  styles.scrollableHeaderCell,
                  styles.headerCell,
                  index === otherKeys.length - 1 && styles.lastHeaderCell,
                  {backgroundColor: bgColor.coloured},
                ]}>
                <Text style={styles.headerText}>{k}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Body Container */}
      <View style={styles.bodyContainer}>
        {/* Fixed First Column - Now takes full height without empty space */}
        <View style={styles.fixedColumn}>
          <ScrollView
            ref={leftVerticalRef}
            onScroll={onLeftVerticalScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            style={styles.fixedColumnScroll}>
            <View
              style={[styles.fixedColumnContent, {height: totalBodyHeight}]}>
              {data.map((row, i) => (
                <Pressable
                  onPress={() => onPressPlayer(row, i)}
                  key={i}
                  style={[
                    styles.fixedColCell,
                    styles.bodyCell,
                    i % 2 === 1 && styles.evenRow,
                    i === data.length - 1 && styles.lastFixedRow,
                  ]}>
                  <Text
                    style={[styles.cellText, {textDecorationLine: 'underline'}]}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {String(row[firstColKey] ?? '')}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Scrollable Content Area */}
        <View style={styles.scrollableArea}>
          <ScrollView
            ref={bodyHorizontalRef}
            horizontal
            onScroll={onBodyHorizontalScroll}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}>
            <ScrollView
              ref={rightVerticalRef}
              onScroll={onRightVerticalScroll}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={true}
              style={styles.verticalScroll}>
              <View
                style={[
                  styles.scrollableContent,
                  {height: totalBodyHeight, width: scrollableWidth},
                ]}>
                {data.map((row, rowIndex) => (
                  <View
                    key={rowIndex}
                    style={[
                      styles.scrollableRow,
                      rowIndex % 2 === 1 && styles.evenRow,
                      rowIndex === data.length - 1 && styles.lastBodyRow,
                    ]}>
                    {otherKeys.map((key, colIndex) => (
                      <View
                        key={key}
                        style={[
                          styles.scrollableBodyCell,
                          styles.bodyCell,
                          colIndex === otherKeys.length - 1 &&
                            styles.lastBodyCell,
                        ]}>
                        <Text
                          style={styles.cellText}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {String(row[key] ?? '')}
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default StickyTable;

const styles = StyleSheet.create({
  container: {
    width: TABLE_WIDTH,
    height: TABLE_HEIGHT,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    alignSelf: 'center',
  },

  // Header Styles
  headerRow: {
    flexDirection: 'row',
    height: HEADER_HEIGHT,
    backgroundColor: '#f2f2f7',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
    zIndex: 999,
  },
  fixedColHeader: {
    width: FIXED_COL_WIDTH,
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  headerScrollView: {
    flex: 1,
  },
  headerScrollContent: {
    flexDirection: 'row',
  },
  scrollableHeaderCell: {
    width: CELL_WIDTH,
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  lastHeaderCell: {
    borderRightWidth: 0,
  },
  headerCell: {
    backgroundColor: '#f2f2f7',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: '700',
    fontSize: 13,
    color: '#fff',
    textAlign: 'left',
  },

  // Body Container
  bodyContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  // Fixed Column - Now properly structured to take full space
  fixedColumn: {
    width: FIXED_COL_WIDTH,
    height: '100%', // Take full height of body container
  },
  fixedColumnScroll: {
    flex: 1,
  },
  fixedColumnContent: {
    width: FIXED_COL_WIDTH,
  },
  fixedColCell: {
    width: FIXED_COL_WIDTH,
    height: ROW_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  lastFixedRow: {
    borderBottomWidth: 0,
  },

  // Scrollable Area
  scrollableArea: {
    flex: 1,
    height: '100%', // Take full height
  },
  horizontalScroll: {
    flex: 1,
  },
  verticalScroll: {
    flex: 1,
  },
  scrollableContent: {
    flexDirection: 'column',
  },
  scrollableRow: {
    flexDirection: 'row',
    height: ROW_HEIGHT,
  },
  lastBodyRow: {
    borderBottomWidth: 0,
  },
  scrollableBodyCell: {
    width: CELL_WIDTH,
    height: ROW_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  lastBodyCell: {
    borderRightWidth: 0,
  },

  // Common Cell Styles
  bodyCell: {
    backgroundColor: '#fff',
  },
  cellText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'left',
  },
  evenRow: {
    backgroundColor: '#fafafa',
  },
});
