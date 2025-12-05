import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import moment from 'moment';
import {HT, WD} from '../../Constant/Dimensions';
import {bgColor} from '../../Constant/Fonts&Colors';

// ------------------ Helpers -------------------

const getInitials = name => {
  if (!name) return '';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

// Dynamic pastel background color
const getRandomColor = () => {
  const colors = [
    '#6C63FF',
    '#FF6584',
    '#4BB543',
    '#FFB200',
    '#1E90FF',
    '#D067E9',
    '#FF7F50',
    '#2ECC71',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// ------------------ Main Component -------------------

export default function PlayerSuggestionModal({
  visible,
  onClose,
  onSubmit,
  allPlayers,
  onSearch,
  resetPlayers,
}) {
  const scrollRef = useRef();
  const inputRef = useRef(null);
  //   console.log('pla', allPlayers[0]);

  const [searchText, setSearchText] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  // Filter players
  //   const filtered = allPlayers.filter(p => p.PlayerName.toLowerCase());

  const addPlayer = player => {
    if (!selectedPlayers.find(p => p.UID === player.UID)) {
      setSelectedPlayers([
        ...selectedPlayers,
        {...player, note: '', color: getRandomColor()},
      ]);
    }
    resetPlayers();
    inputRef.current?.clear();
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({animated: true});
    }, 100);
  };

  const removePlayer = id => {
    setSelectedPlayers(selectedPlayers.filter(p => p.UID !== id));
  };

  const updateNote = (id, text) => {
    setSelectedPlayers(
      selectedPlayers.map(p => (p.UID === id ? {...p, note: text} : p)),
    );
  };

  return (
    <Modal isVisible={visible} style={{width: WD(90), height: HT(20)}}>
      <View style={styles.modalContainer}>
        {/* ------------------ Heading ------------------ */}
        <Text style={styles.heading}>Search & Add Players</Text>

        {/* ------------------ Search Box ------------------ */}
        <TextInput
          ref={inputRef}
          placeholder="Type to search players..."
          style={styles.searchInput}
          //   value={searchText}
          onChangeText={onSearch}
        />

        <Text style={styles.subText}>
          Search and click to add multiple players
        </Text>

        {/* ------------------ Search Results ------------------ */}
        {allPlayers.length != 0 && (
          <View
            style={{
              width: '100%',
              height: '50%',
              backgroundColor: bgColor.text_secondary,
              shadowColor: bgColor.grey,
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.5,
              marginTop: HT(1),
            }}>
            <FlatList
              data={allPlayers}
              style={{marginTop: HT(0.5)}}
              renderItem={({item, index}) => (
                <Pressable
                  key={index}
                  style={styles.searchItem}
                  onPress={() => addPlayer(item)}>
                  <Text style={{fontSize: 16}}>{item.PlayerName}</Text>
                </Pressable>
              )}
            />
          </View>
        )}

        {/* ------------------ Selected Players ------------------ */}
        {selectedPlayers.length != 0 ? (
          <ScrollView
            ref={scrollRef}
            showsVerticalScrollIndicator={false}
            style={{marginBottom: HT(7), height: HT(15), marginTop: HT(2)}}>
            <Text style={styles.selectedHeading}>
              Selected Players ({selectedPlayers.length})
            </Text>

            {selectedPlayers.map(player => (
              <View key={player.UID} style={styles.playerCard}>
                {/* Delete Button */}
                <Pressable
                  style={{
                    position: 'absolute',
                    right: WD(3),
                    top: WD(3),
                    zIndex: 10,
                  }}
                  onPress={() => removePlayer(player.UID)}>
                  <Text
                    style={{
                      fontSize: 22,
                      color: '#777',
                    }}>
                    ✕
                  </Text>
                </Pressable>
                {/* Avatar + Name */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={[styles.avatar, {backgroundColor: player.color}]}>
                    <Text style={styles.avatarText}>
                      {getInitials(player.PlayerName)}
                    </Text>
                  </View>

                  <View style={{marginLeft: 10}}>
                    <Text style={styles.playerName}>{player.PlayerName}</Text>
                    <Text style={styles.playerInfo}>
                      {/* {player.Gender} • Bat: {player.Batting} • Bowl:{' '}
                      {player.Bowling} */}
                    </Text>
                  </View>
                </View>

                {/* Notes */}
                <Text style={styles.noteLabel}>
                  Note for {player.PlayerName}
                </Text>

                <TextInput
                  placeholder="Why is this player a good fit?"
                  multiline
                  style={styles.textArea}
                  value={player.note}
                  onChangeText={text => updateNote(player.UID, text)}
                />
              </View>
            ))}
          </ScrollView>
        ) : null}

        {/* ------------------ Footer Buttons ------------------ */}
        <View style={styles.footer}>
          <Pressable style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>

          <Pressable
            style={styles.submitBtn}
            onPress={() => onSubmit(selectedPlayers)}>
            <Text style={styles.submitText}>
              Submit {selectedPlayers.length} Suggestion(s)
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

// ------------------ Styles -------------------
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#F8F9FB',
    padding: 20,
    width: WD(90),
    height: HT(85),
    borderRadius: WD(2),
  },
  heading: {
    fontSize: 20,
    fontWeight: '800',
  },
  searchInput: {
    marginTop: 15,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  subText: {
    marginTop: 8,
    color: '#707070',
  },
  searchItem: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginVertical: 3,
  },
  selectedHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  playerCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '700',
    width: '90%',
  },
  playerInfo: {
    fontSize: 12,
    color: '#666',
  },
  noteLabel: {
    marginTop: 10,
    fontWeight: '600',
    fontSize: 14,
  },
  textArea: {
    marginTop: 5,
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    padding: 12,
    minHeight: 70,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: HT(1),
  },
  cancelBtn: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
    left: WD(1),
  },
  cancelText: {
    fontSize: 16,
    color: '#333',
  },
  submitBtn: {
    backgroundColor: bgColor.coloured,
    padding: 15,
    borderRadius: 8,
    minWidth: 180,
    alignItems: 'center',
    left: WD(2),
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
