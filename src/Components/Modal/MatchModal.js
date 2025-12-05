import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import PlayerStatsTable from '../Scouting/PlayerStatsTable';
import {HT} from '../../Constant/Dimensions';

export default function MatchModal({
  visible,
  onClose,
  tab,
  data,
  overall,
  onPressComp,
  modal,
}) {
  return (
    <Modal
      isVisible={visible}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      backdropOpacity={0.4}
      onBackdropPress={onClose}
      style={{justifyContent: 'center', margin: 0}}>
      <View style={styles.modalBox}>
        <PlayerStatsTable
          data={data}
          overall={overall}
          tab={tab}
          onPressComp={data => onPressComp(data)}
          hideOverall={true}
          modal={modal}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBox: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#F7F9FB',
    borderRadius: 12,
    padding: 20,
    height: HT(50),
  },

  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 15,
  },

  inputBox: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#D8DCE2',
    borderRadius: 8,
    backgroundColor: 'white',
  },

  input: {
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
  },

  subText: {
    marginTop: 8,
    color: '#6E7580',
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },

  cancelBtn: {
    width: '40%',
    height: 45,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CDD3DB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelText: {
    color: '#1A1A1A',
    fontSize: 16,
  },

  submitBtn: {
    width: '55%',
    height: 45,
    borderRadius: 8,
    backgroundColor: '#7BA7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  submitText: {
    color: 'white',
    fontSize: 16,
  },
});
