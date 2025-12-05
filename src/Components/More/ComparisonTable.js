import React from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {HT, WD} from '../../Constant/Dimensions';
import {bgColor} from '../../Constant/Fonts&Colors';

const {width} = Dimensions.get('window');
const tableWidth = width * 0.95;

const ROW_HEIGHT = 55;

const ComparisonTable = ({player1, player2, kpis}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View
          style={[
            styles.cell,
            styles.kpiCell,
            {backgroundColor: bgColor.coloured},
          ]}>
          <Text style={[styles.headerText, {color: bgColor.text_primary}]}>
            KPIs
          </Text>
        </View>

        <View style={[styles.cell, {backgroundColor: bgColor.coloured}]}>
          <Text style={[styles.headerText, {color: bgColor.text_primary}]}>
            {player1?.Player}
          </Text>
        </View>

        <View style={[styles.cell, {backgroundColor: bgColor.coloured}]}>
          <Text style={[styles.headerText, {color: bgColor.text_primary}]}>
            {player2?.Player}
          </Text>
        </View>
      </View>

      {/* Scrollable body */}
      <ScrollView
        style={{height: HT(55)}} // <-- FIXED HEIGHT for scroll
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}>
        {kpis.map((row, index) => (
          <View key={index} style={styles.bodyRow}>
            {/* Static KPI Column */}
            <View
              style={[
                styles.cell,
                styles.kpiCell,
                {backgroundColor: bgColor.coloured},
              ]}>
              <Text style={[styles.kpiText, {color: bgColor.text_primary}]}>
                {row.label}
              </Text>
            </View>

            {/* Player 1 value */}
            <View style={styles.cell}>
              <Text style={styles.bodyText}>{player1[row.key]}</Text>
            </View>

            {/* Player 2 value */}
            <View style={styles.cell}>
              <Text style={styles.bodyText}>{player2[row.key]}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: tableWidth,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    marginTop: 10,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f4c430',
  },
  cell: {
    width: tableWidth * 0.3,
    height: ROW_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#eee',
    borderWidth: 0.6,
    paddingHorizontal: 5,
  },
  kpiCell: {
    width: tableWidth * 0.4,
    backgroundColor: '#f4c430',
  },
  headerText: {
    fontWeight: '700',
    fontSize: 15,
    textAlign: 'center',
  },
  kpiText: {
    fontWeight: '600',
    fontSize: 16,
  },
  bodyRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  bodyText: {
    fontSize: 15,
    fontWeight: '500',
  },
});

export default ComparisonTable;
