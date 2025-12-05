import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {HT, WD} from '../../../../../Constant/Dimensions';
import {bgColor} from '../../../../../Constant/Fonts&Colors';
import VideoThumbnail from '../../../../../Components/Video/VideoThumbnail';

const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2;

// const filters = ['Sessions', 'Batters', 'Bowlers', 'Type'];

export default function Video_Coach({videos}) {
  return (
    <View style={styles.container}>
      {/* Card List */}
      <FlatList
        style={{zIndex: -10}}
        data={videos}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        // keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          paddingVertical: HT(1.5),
          paddingHorizontal: WD(3),
        }}
        renderItem={({item, index}) => (
          <View key={index} style={styles.card}>
            {/* Image */}
            <VideoThumbnail
              url={item.VideoURL}
              width={'100%'}
              height={'100%'}
              // playImgSize={WD(10)}
              videoId={item.VideoId}
            />

            <View
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                backgroundColor: bgColor.black,
                opacity: 0.5,
              }}
            />

            {/* Overlay Content */}
            <View style={styles.overlay}>
              <Text style={styles.title}>{item.VideoName}</Text>
              <Text style={[styles.player]}>{item.StrikerName}</Text>
              <Text style={[styles.player, {paddingTop: HT(0.5)}]}>
                {item.BowlerName}
              </Text>
              <Text style={styles.date}>{item.UploadedDate}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Filters UI
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: WD(2),
    width: WD(100),
    height: HT(5),
    // overflow: 'hidden',
  },
  filterButton: {
    paddingVertical: 5,
    paddingHorizontal: WD(2),
    borderRadius: 20,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    height: HT(5),
  },
  filterText: {
    color: '#2E4E2E',
    fontSize: 14,
    fontWeight: '600',
  },

  // Card UI
  card: {
    width: CARD_WIDTH,
    height: HT(20),
    backgroundColor: '#000',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 15,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },

  // Badge
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    zIndex: 10,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
    left: WD(1),
  },

  // Overlay Text
  overlay: {
    position: 'absolute',
    bottom: 12,
    left: 10,
  },
  title: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 4,
  },
  player: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 12,
  },
  date: {
    color: '#eee',
    fontSize: 11,
    marginTop: 4,
  },
});
