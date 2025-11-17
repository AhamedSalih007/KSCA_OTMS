import React, {useCallback, useEffect, useRef} from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import {HT, WD} from '../../Constant/Dimensions';
import {MenCategory, WomenCategory} from '../../Constant/FormsData';
import {bgColor, fontSize} from '../../Constant/Fonts&Colors';
import {useSelector} from 'react-redux';

const CategoryView = ({selectedCategory, pressedCategory, gender}) => {
  // console.log('index', selectedCategory);

  const flatRef = useRef(null);

  useEffect(() => {
    if (selectedCategory >= 3) {
      flatRef.current?.scrollToEnd({animated: true});
    } else {
      flatRef.current?.scrollToOffset({offset: 0, animated: true});
    }
  }, [selectedCategory]);

  const renderCategory = useCallback(
    (item, index) => {
      return (
        <Pressable
          onPress={() => pressedCategory(item, index)}
          style={{
            width:
              item.category == 'Mental Condition' ||
              item.category == 'Physical Condition'
                ? WD(40)
                : WD(20),
            height: HT(5),
            // backgroundColor: 'blue',
            marginHorizontal: WD(0.5),
            alignItems: 'center',
            justifyContent: 'center',
            // borderBottomWidth: selectedCategory == index ? 2 : 0,
            borderBottomColor: bgColor.coloured,
            // bottom: HT(0.5),
          }}>
          <Text
            style={{
              color:
                selectedCategory == index ? bgColor.coloured : bgColor.grey,
              fontSize: fontSize.Medium,
              fontWeight: '700',
            }}>
            {item.category}
          </Text>

          {selectedCategory == index ? (
            <View
              style={{
                width: '95%',
                height: '9%',
                backgroundColor: bgColor.coloured,
                position: 'absolute',
                bottom: -2,
                borderTopRightRadius: WD(2),
                borderTopLeftRadius: WD(2),
              }}
            />
          ) : null}
        </Pressable>
      );
    },
    [selectedCategory, pressedCategory],
  );

  return (
    <View
      style={{
        width: 'auto',
        height: HT(7),
        // backgroundColor: bgColor.red,
      }}>
      <FlatList
        ref={flatRef}
        contentContainerStyle={{
          alignItems: 'center',
          paddingHorizontal: WD(2),
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={gender == 1 ? MenCategory : WomenCategory}
        renderItem={({item, index}) => renderCategory(item, index)}
      />
    </View>
  );
};

export default CategoryView;
