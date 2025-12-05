import React from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {WD, HT, WIDTH} from '../../../Constant/Dimensions';
import {bgColor, fontSize} from '../../../Constant/Fonts&Colors';

const PlayerProfileCard = ({player, onPressQuickScout}) => {
  return (
    <View style={styles.card}>
      {/* Player Name & Quick Scout Button */}
      <View style={styles.headerRow}>
        <Text style={styles.playerName}>{player.name}</Text>

        <Pressable style={styles.quickScoutBtn} onPress={onPressQuickScout}>
          <Image
            source={require('../../../Assets/Images/visible.png')}
            style={styles.eyeIcon}
          />
          <Text style={styles.btnText}>Quick Scout</Text>
        </Pressable>
      </View>

      {/* Basic Details */}
      <Text style={styles.subText}>
        {player.batStyle} • {player.bowlStyle || 'None'}
      </Text>

      {/* Date Range */}
      <Text style={[styles.subText, {marginTop: 6}]}>From {player.from}</Text>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Statistics */}
      <View style={styles.statsRow}>
        {renderStat('Matches', player.matches)}
        {renderStat('Runs', player.runs)}
        {renderStat('Wickets', player.wickets)}
        {renderStat('Average', player.average)}
      </View>

      <View style={[styles.statsRow, {marginTop: 15}]}>
        {renderStat('Strike Rate', player.strikeRate)}
        {renderStat('Economy', player.economy)}
        {renderStat('Forms', player.forms)}
      </View>
    </View>
  );
};

// Helper UI for each stat
const renderStat = (label, value) => (
  <View style={styles.statBox}>
    <Text style={styles.statValue}>{value ?? 0}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: WIDTH * 0.92,
    backgroundColor: bgColor.white,
    alignSelf: 'center',
    marginVertical: HT(1.2),
    borderRadius: WD(2),
    padding: WD(4),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    elevation: 3,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  playerName: {
    fontSize: fontSize.Large,
    fontWeight: '700',
    color: bgColor.black,
    flex: 1,
    paddingRight: WD(2),
  },

  quickScoutBtn: {
    flexDirection: 'row',
    backgroundColor: bgColor.coloured,
    paddingHorizontal: WD(2),
    paddingVertical: HT(0.8),
    borderRadius: WD(2),
    alignItems: 'center',
  },

  eyeIcon: {
    width: 18,
    height: 18,
    marginRight: 6,
    tintColor: bgColor.white,
  },

  btnText: {
    fontSize: fontSize.Small,
    fontWeight: '600',
    color: bgColor.white,
  },

  subText: {
    fontSize: fontSize.Small,
    marginTop: 4,
    opacity: 0.6,
  },

  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: HT(1.3),
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statBox: {
    width: '23%',
    alignItems: 'center',
  },

  statValue: {
    fontSize: fontSize.Large_50,
    fontWeight: '700',
    color: bgColor.black,
  },

  statLabel: {
    fontSize: fontSize.Small,
    color: '#888',
    textAlign: 'center',
    marginTop: 3,
  },
});

export default PlayerProfileCard;
