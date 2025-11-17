import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {bgColor} from '../../Constant/Fonts&Colors';
import {HT, WD} from '../../Constant/Dimensions';

const CommentText = ({name, time, text, avatar}) => {
  return (
    <View style={styles.container}>
      {/* Avatar */}
      {/* <Image source={avatar} style={styles.avatar} /> */}

      <View style={styles.messageSection}>
        {/* Name + Time */}
        <View style={styles.headerRow}>
          {/* <Text style={styles.name}>{name}</Text> */}
          <Text style={styles.time}>{time}</Text>
        </View>

        {/* Message Bubble */}
        <View style={styles.bubble}>
          <Text style={styles.message}>{text}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: WD(3),
    paddingVertical: HT(1),
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  messageSection: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    color: bgColor.white,
    fontWeight: '600',
    fontSize: 14,
    marginRight: 8,
  },
  time: {
    color: bgColor.white,
    // fontSize: 12,
  },
  bubble: {
    backgroundColor: bgColor.coloured, // dark navy (like screenshot)
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    maxWidth: '85%',
  },
  message: {
    color: bgColor.white,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default CommentText;
