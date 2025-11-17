import React, {useCallback} from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import {HT, WD, WIDTH} from '../../Constant/Dimensions';
import {
  bgColor,
  darkTheme,
  fontSize,
  lightTheme,
} from '../../Constant/Fonts&Colors';
import {useSelector} from 'react-redux';

const SubHeaderView = ({dataArray, currentIndex, onChangeIndex}) => {
  const {darkMode} = useSelector(state => state.localdata);
  // console.log('dar', darkMode);

  const theme = darkMode ? darkTheme : lightTheme;

  const renderItem = useCallback(
    (item, index) => {
      return (
        <Pressable
          onPress={() => onChangeIndex(index)}
          style={{
            backgroundColor:
              currentIndex == index ? theme.primary : theme.secondary,
            margin: 2,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: WD(10),
            paddingVertical: HT(1.5),
            paddingHorizontal: WD(5),
            borderBottomColor: bgColor.grey,
          }}>
          <Text
            style={{
              color:
                currentIndex == index
                  ? theme.selectedButtonColor
                  : theme.primary,
              fontSize: fontSize.Medium,
            }}>
            {item.name}
          </Text>
        </Pressable>
      );
    },
    [currentIndex, darkMode],
  );

  return (
    <View
      style={{
        width: WIDTH,
        height: HT(8),
        backgroundColor: theme.viewColor,
        paddingHorizontal: WD(2),
        borderBottomWidth: 0.2,
        borderBottomColor: theme.textColor,
      }}>
      <FlatList
        contentContainerStyle={{alignItems: 'center'}}
        horizontal
        data={dataArray}
        renderItem={({item, index}) => renderItem(item, index)}
      />
    </View>
  );
};

export default SubHeaderView;
