import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import PlayerRow from './PlayerRow';

export default function TeamSectionCard({team, onToggle}) {
  return (
    <View style={styles.container}>
      <Text style={styles.teamName}>{team.teamName}</Text>

      {/* Playing XI */}
      <Text style={styles.sectionTitle}>Playing XI</Text>

      <FlatList
        data={team.playingXI}
        keyExtractor={(item, index) => team.teamName + '_xi_' + index}
        renderItem={({item, index}) => (
          <PlayerRow
            item={item}
            onSelect={() => onToggle(team.teamName, 'playingXI', index)}
          />
        )}
      />

      {/* Substitutes */}
      {team.substitutes && team.substitutes.length > 0 && (
        <>
          <Text style={[styles.sectionTitle, {marginTop: 10}]}>
            Substitutes
          </Text>

          <FlatList
            data={team.substitutes}
            keyExtractor={(item, index) => team.teamName + '_sub_' + index}
            renderItem={({item, index}) => (
              <PlayerRow
                item={item}
                onSelect={() => onToggle(team.teamName, 'substitutes', index)}
              />
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingHorizontal: 15,
  },
  teamName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A6381',
    marginVertical: 6,
  },
});
