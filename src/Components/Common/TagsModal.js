import React, {useState, useMemo} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Modal from 'react-native-modal';
import {HT, WD} from '../../Constant/Dimensions';
import {bgColor, fontSize} from '../../Constant/Fonts&Colors';
import RadioTag from '../Video/TagInputs/RadioTag';
import DropdownTag from '../Video/TagInputs/DropdownTag';
import NormalInputTag from '../Video/TagInputs/NormalInputTag';
import {shallowEqual, useSelector} from 'react-redux';

const TagsModal = React.memo(
  ({
    isModalVisible,
    closeModal,
    currentTag,
    currentTagList,
    onChangeText,
    onSave,
  }) => {
    const tagList = useSelector(state => state.localdata.tagList, shallowEqual);
    // console.log('ct', tagList);

    const creaseMomentList = useMemo(
      () => tagList?.CreaseMovement || [],
      [tagList],
    );
    const strokeList = useMemo(() => tagList?.Stroke || [], [tagList]);
    const shotConnectionList = useMemo(
      () => tagList?.ShotConnection || [],
      [tagList],
    );

    const battingType = [
      {id: 1, name: 'LHB'},
      {id: 2, name: 'RHB'},
    ];

    return (
      <View style={styles.container}>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={closeModal} // close when tapping outside
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropOpacity={0.5}>
          <View style={styles.modalContent}>
            <Text
              style={{
                color: bgColor.black,
                fontSize: fontSize.Large,
                textAlign: 'center',
                top: HT(2),
                fontWeight: 'bold',
              }}>
              {currentTag}
            </Text>
            {currentTag == 'Batter Tags' ? (
              <>
                <RadioTag
                  types={battingType}
                  tagName={'Batting Type'}
                  value={currentTagList[0].value}
                  onChange={data => onChangeText(data, 0)}
                />

                <DropdownTag
                  tagName={'Crease Moment'}
                  value={currentTagList[1].value}
                  data={creaseMomentList}
                  onChange={data => onChangeText(data, 1)}
                />
                <DropdownTag
                  tagName={'Stroke'}
                  value={currentTagList[2].value}
                  data={strokeList}
                  onChange={data => onChangeText(data, 2)}
                />
                <DropdownTag
                  tagName={'Shot Connection'}
                  value={currentTagList[3].value}
                  data={shotConnectionList}
                  onChange={data => onChangeText(data, 3)}
                />
              </>
            ) : (
              <>
                <NormalInputTag
                  tagName={currentTagList[0].key}
                  value={currentTagList[0].value}
                  onChangeText={text => onChangeText(text, 0)}
                />
                <NormalInputTag
                  tagName={currentTagList[1].key}
                  value={currentTagList[1].value}
                  onChangeText={text => onChangeText(text, 1)}
                />
                <NormalInputTag
                  tagName={currentTagList[2].key}
                  value={currentTagList[2].value}
                  onChangeText={text => onChangeText(text, 2)}
                />
                <NormalInputTag
                  tagName={currentTagList[3].key}
                  value={currentTagList[3].value}
                  onChangeText={text => onChangeText(text, 3)}
                />
              </>
            )}

            <Pressable
              onPress={onSave}
              style={{
                width: '30%',
                height: '8%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: bgColor.green,
                position: 'absolute',
                bottom: HT(1),
                right: WD(5),
                borderRadius: WD(2),
              }}>
              <Text style={{color: bgColor.white}}>Save</Text>
            </Pressable>
            <Pressable
              onPress={closeModal}
              style={{
                width: '30%',
                height: '8%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: bgColor.black,
                position: 'absolute',
                bottom: HT(1),
                right: WD(35),
                borderRadius: WD(2),
              }}>
              <Text style={{color: bgColor.white}}>close</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    );
  },
);

export default TagsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  openButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#FF3B30',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalContent: {
    width: WD(90),
    height: HT(55),
    backgroundColor: bgColor.white,
    borderRadius: WD(2),
  },
  modalText: {
    fontSize: 16,
    color: '#333',
  },
});
