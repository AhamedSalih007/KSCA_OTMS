import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import {bgColor} from '../../../Constant/Fonts&Colors';

export default function SelectPlayers({
  goBack,
  onContinue,
  text,
  header,
  loading,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.back}>
        <Image
          source={require('../../../Assets/Images/down-arrow.png')}
          style={styles.iconBack}
        />
      </TouchableOpacity>

      <Text style={styles.title}>{header}</Text>

      <TouchableOpacity onPress={onContinue} style={styles.continueBtn}>
        {!loading ? (
          <Text style={styles.continueText}>{text}</Text>
        ) : (
          <ActivityIndicator size={'small'} color={bgColor.white} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  back: {
    padding: 5,
  },
  iconBack: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    transform: [{rotate: '90deg'}],
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  continueBtn: {
    backgroundColor: bgColor.coloured,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  continueText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
