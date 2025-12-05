import React from 'react';
import {View, TextInput, StyleSheet, Image} from 'react-native';
import {HT} from '../../Constant/Dimensions';

export default function SearchPlayer({value, onChange}) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../Assets/Images/search.png')}
        style={styles.icon}
      />

      <TextInput
        placeholder="Search for a player"
        value={value}
        onChangeText={onChange}
        style={styles.input}
        placeholderTextColor="#8A8A8E"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F2F4',
    marginHorizontal: 15,
    padding: 12,
    borderRadius: 12,
    marginTop: HT(4.5),
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 8,
  },
  input: {
    fontSize: 16,
    flex: 1,
  },
});
