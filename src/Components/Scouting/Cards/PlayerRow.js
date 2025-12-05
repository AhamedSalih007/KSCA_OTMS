import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

export default function PlayerRow({item, onSelect}) {
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={[styles.container, item.selected && styles.selectedContainer]}>
      <Image
        source={require('../../../Assets/Images/player.png')}
        style={styles.avatar}
      />

      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>{item.role.join(' • ')}</Text>
      </View>

      <Image
        source={
          item.selected
            ? require('../../../Assets/Images/check.png')
            : require('../../../Assets/Images/plus.png')
        }
        style={[styles.icon, item.selected && styles.checkIcon]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  selectedContainer: {
    backgroundColor: '#E5EEFF',
    borderRadius: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 30,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  role: {
    fontSize: 13,
    color: '#4A6381',
    marginTop: 2,
  },
  icon: {
    width: 26,
    height: 26,
  },
  checkIcon: {
    tintColor: '#1B66FD',
  },
});
