import React from 'react';
import {FlatList, Image, Pressable, Text, TextInput, View} from 'react-native';
import Modal from 'react-native-modal';
import {HT, WD} from '../../Constant/Dimensions';
import {bgColor, fontSize} from '../../Constant/Fonts&Colors';

const FiltersModal = ({
  visible,
  onClose,
  data,
  name,
  pressSelect,
  selectedData,
  currentSession,
  currentBatters,
  currentBowlers,
  currentType,
  onClear,
  onCancel,
}) => {
  const textRender = item => {
    if (name == 'Sessions') {
      return item.SessionName;
    } else if (name == 'Batters' || name == 'Bowlers') {
      return item.PlayerName;
    } else {
      return item.name;
    }
  };

  const checkSelected = item => {
    if (name == 'Sessions') {
      return item.SessionName == currentSession?.SessionName;
    } else if (name == 'Batters' || name == 'Bowlers') {
      if (name == 'Batters') {
        return item.PlayerName == currentBatters?.PlayerName;
      } else {
        return item.PlayerName == currentBowlers?.PlayerName;
      }
    } else {
      return item.name == currentType?.name;
    }
  };

  const renderItem = (item, index) => {
    return (
      <>
        <Pressable
          onPress={() => pressSelect(item, index)}
          style={{
            width: WD(82),
            height: HT(6),
            borderColor: bgColor.borderGrey,
            marginTop: HT(1),
            alignItems: 'flex-start',
            justifyContent: 'center',
            borderRadius: WD(2),
            borderWidth: 1,
            paddingHorizontal: WD(2),
          }}>
          <Text style={{color: bgColor.black, fontSize: fontSize.Medium}}>
            {textRender(item)}
          </Text>

          {checkSelected(item) && (
            <Pressable
              style={{
                width: WD(7),
                height: WD(7),
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: bgColor.coloured,
                borderRadius: WD(7) / 2,
                position: 'absolute',
                right: WD(5),
              }}>
              <Image
                style={{width: '60%', height: '60%', tintColor: bgColor.white}}
                source={require('../../Assets/Images/check.png')}
              />
            </Pressable>
          )}
        </Pressable>
      </>
    );
  };

  return (
    <Modal
      isVisible={visible}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      backdropOpacity={0.4}
      onBackdropPress={onClose}
      style={{justifyContent: 'center', margin: 0, alignSelf: 'center'}}>
      <View
        style={{
          width: WD(90),
          height: HT(50),
          backgroundColor: bgColor.white,
          borderRadius: WD(2),
          padding: WD(2),
        }}>
        <View
          style={{
            width: '100%',
            height: '10%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: bgColor.black,
              fontSize: fontSize.Medium,
              fontWeight: '700',
            }}>
            Select {name}
          </Text>
        </View>

        <View
          style={{
            width: '95%',
            height: '10%',
            flexDirection: 'row',
            backgroundColor: bgColor.borderGrey,
            alignSelf: 'center',
            borderRadius: WD(2.5),
            // justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            resizeMode="contain"
            style={{width: '10%', height: '60%'}}
            source={require('../../Assets/Images/search.png')}
          />
          <TextInput
            selectionColor={bgColor.coloured}
            style={{
              width: '90%',
              height: '100%',
            }}
            placeholder={'Please enter text'}
          />
        </View>

        <View
          style={{
            width: '100%',
            height: '80%',
            alignItems: 'center',
            paddingVertical: HT(1),
          }}>
          <FlatList
            data={data}
            renderItem={({item, index}) => renderItem(item, index)}
          />
        </View>

        {/* Cancel */}

        <Pressable
          onPress={onCancel}
          style={{
            width: '20%',
            height: '8%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: bgColor.black,
            position: 'absolute',
            left: WD(2),
            top: HT(0.8),
            borderRadius: WD(2),
          }}>
          <Text
            style={{
              color: bgColor.white,
              fontSize: fontSize.lightMedium,
              fontWeight: '600',
            }}>
            Cancel
          </Text>
        </Pressable>

        {/* Clear Button */}

        <Pressable
          onPress={() => onClear(name)}
          style={{
            width: '20%',
            height: '8%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: bgColor.red,
            position: 'absolute',
            right: WD(2),
            top: HT(0.8),
            borderRadius: WD(2),
          }}>
          <Text
            style={{
              color: bgColor.white,
              fontSize: fontSize.lightMedium,
              fontWeight: '600',
            }}>
            Clear
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default FiltersModal;
