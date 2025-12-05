import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {bgColor} from '../../Constant/Fonts&Colors';
import {HT, WD} from '../../Constant/Dimensions';

const TAB_LABELS = ['Videos', 'Pitchmap', 'Beehive', 'Wagonwheel'];
const SCREEN_WIDTH = Dimensions.get('window').width;

const TopTabBar = ({onTabChange}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [layouts, setLayouts] = useState([]); // [{ x, width }, ...]

  const scrollRef = useRef(null);

  const pillX = useSharedValue(0);
  const pillWidth = useSharedValue(0);

  // animated style for moving pill
  const pillStyle = useAnimatedStyle(() => ({
    transform: [{translateX: pillX.value}],
    width: pillWidth.value,
  }));

  const handlePressTab = index => {
    setActiveIndex(index);

    const layout = layouts[index];
    if (layout) {
      pillX.value = withTiming(layout.x - 6, {duration: 220});
      pillWidth.value = withTiming(layout.width + 12, {duration: 220});

      // scroll so selected tab stays visible
      scrollRef.current?.scrollTo({
        x: layout.x - SCREEN_WIDTH / 3,
        animated: true,
      });
    }

    onTabChange && onTabChange(index);
  };

  const handleTabLayout = (index, e) => {
    const {x, width} = e.nativeEvent.layout;

    setLayouts(prev => {
      const copy = [...prev];
      copy[index] = {x, width};
      return copy;
    });

    // init pill position for first tab once layout known
    if (index === 0 && pillWidth.value === 0) {
      pillX.value = x - 6;
      pillWidth.value = width + 12;
    }
  };

  return (
    <View style={styles.root}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Sliding background pill */}
        {layouts.length > 0 && (
          <Animated.View style={[styles.pill, pillStyle]} />
        )}

        {TAB_LABELS.map((label, index) => (
          <TouchableOpacity
            key={label}
            onPress={() => handlePressTab(index)}
            onLayout={e => handleTabLayout(index, e)}
            style={styles.tabPressArea}
            activeOpacity={0.9}>
            <View style={styles.tabInner}>
              <Text
                style={[
                  styles.tabText,
                  activeIndex === index && styles.tabTextActive,
                ]}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default TopTabBar;

const styles = StyleSheet.create({
  root: {
    paddingVertical: 10,
  },
  scrollContent: {
    paddingHorizontal: WD(2),
    alignItems: 'center',
    paddingVertical: HT(1),
    marginLeft: WD(1),
    // backgroundColor: bgColor.borderGrey,
    // important: pill is absolute relative to this container
  },
  pill: {
    position: 'absolute',
    left: 0,
    height: 36,
    borderRadius: 18,
    backgroundColor: bgColor.coloured,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  tabPressArea: {
    marginRight: 10,
  },
  tabInner: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#9a9aa0',
  },
  tabTextActive: {
    color: bgColor.white,
    fontWeight: '700',
  },
});
