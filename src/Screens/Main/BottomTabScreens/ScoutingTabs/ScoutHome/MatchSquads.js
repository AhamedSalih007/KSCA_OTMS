import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {bgColor} from '../../../../../Constant/Fonts&Colors';
import SelectPlayers from '../../../../../Components/Scouting/Headers/SelectPlayers';
import SearchPlayer from '../../../../../Components/Scouting/SearchPlayer';
import NavCard from '../../../../../Components/Scouting/Cards/NavCard';
import {FlatList} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import TeamSectionCard from '../../../../../Components/Scouting/Cards/TeamSectionCard';
import {
  GetFormsByRoleId_ScoutingAPI,
  GetSquadByMatch_ScoutingAPI,
} from '../../../../../API/ScoutingAPI';
import PlayerCard from '../../../../../Components/Scouting/Cards/PlayerCard';
import {HT} from '../../../../../Constant/Dimensions';
import {useSelector} from 'react-redux';

const players = {
  teams: [
    {
      teamName: 'Mumbai Indians',
      playingXI: [
        {
          name: 'Rohit Sharma',
          role: ['RHB', 'Captain'],
          selected: true,
        },
        {
          name: 'Ishan Kishan',
          role: ['LHB', 'WK'],
          selected: false,
        },
        {
          name: 'Suryakumar Yadav',
          role: ['RHB'],
          selected: false,
        },
      ],
      substitutes: [
        {
          name: 'Tilak Varma',
          role: ['LHB', 'RAO'],
          selected: false,
        },
      ],
    },
    {
      teamName: 'Chennai Super Kings',
      playingXI: [
        {
          name: 'Ruturaj Gaikwad',
          role: ['RHB', 'Captain'],
          selected: false,
        },
        {
          name: 'MS Dhoni',
          role: ['RHB', 'WK'],
          selected: true,
        },
        {
          name: 'Ravindra Jadeja',
          role: ['LHB', 'SLA'],
          selected: true,
        },
        {
          name: 'Deepak Chahar',
          role: ['RAM'],
          selected: true,
        },
      ],
    },
  ],
  selectedCount: 4,
  totalAllowed: 22,
};

const MatchSquads = props => {
  const {compId, matchId, teamNameA, teamNameB} = props.route.params;

  const {userData} = useSelector(state => state.localdata);

  console.log('data', userData);

  const [searchText, setSearchText] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(1);

  const [teams, setTeams] = useState(
    players.teams.filter(d => d.teamName == 'Mumbai Indians'),
  );

  const [filterTeams, setFilterTeams] = useState(players.teams);

  const [teamA, setTeamA] = useState([]);
  const [teamA2, setTeamA2] = useState([]);

  const [teamB, setTeamB] = useState([]);
  const [teamB2, setTeamB2] = useState([]);

  const [currentTeamId, setCurrentTeamId] = useState(1);

  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [form, setForm] = useState([]);

  // console.log('length', form);

  useEffect(() => {
    getSquadByMatch();
    getFormByRole();
  }, []);

  const getFormByRole = async () => {
    const res = await GetFormsByRoleId_ScoutingAPI(2); //userData?.roleID

    if (res != 'Error') {
      console.log('res', res.data.length);
      setForm(res?.data);
    } else {
    }
  };

  const getSquadByMatch = async () => {
    const responseSquad = await GetSquadByMatch_ScoutingAPI(compId, matchId);

    if (responseSquad != 'Error') {
      // console.log('res', responseSquad?.data);

      setTeamA(responseSquad?.data[0]);
      setTeamB(responseSquad?.data[1]);
      setTeamA2(responseSquad?.data[0]);
      setTeamB2(responseSquad?.data[1]);
    } else {
    }
  };

  const onChangeText = text => {
    // console.log('text', text);

    setSearchText(text);

    if (currentTeamId == 1) {
      const filterTeamA = teamA2.filter(d => {
        return d.Playername.toLowerCase().includes(text.toLowerCase());
      });
      setTeamA(filterTeamA);
    } else {
      const filterTeamB = teamB2.filter(d => {
        return d.Playername.toLowerCase().includes(text.toLowerCase());
      });
      setTeamB(filterTeamB);
    }
  };

  const onPressStatus = id => {
    setSelectedTeam(id);

    setCurrentTeamId(id);

    // if (id == 1) {
    //   const filtered = filterTeams.filter(d => d.teamName == 'Mumbai Indians');

    //   setTeams(filtered);
    // } else {
    //   const filtered = filterTeams.filter(
    //     d => d.teamName == 'Chennai Super Kings',
    //   );

    //   setTeams(filtered);
    // }
  };

  const onContinueHandle = () => {
    if (selectedPlayers.length != 0) {
      props.navigation.navigate('FormDataPlayers', {
        selectedPlayers,
        selectedIds,
        baseForm: form,
        compId,
        matchId,
      });
    } else {
      alert('Please select atleast one player');
    }
  };

  const onPressPlayer = item => {
    // console.log('item', item);

    if (selectedIds.includes(item.UID)) {
      const filterPlayers = selectedPlayers.filter(d => d.UID != item.UID);
      setSelectedPlayers(filterPlayers);
      const filterIds = selectedIds.filter(d => d != item.UID);
      setSelectedIds(filterIds);
    } else {
      setSelectedIds([...selectedIds, item.UID]);
      setSelectedPlayers([...selectedPlayers, item]);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: bgColor.bg_globe}}>
      <SelectPlayers
        goBack={() => props.navigation.goBack()}
        onContinue={onContinueHandle}
        header="Select Players"
        text="Continue"
      />

      <NavCard
        status={selectedTeam}
        onPressStatus={onPressStatus}
        teamA={teamNameA}
        teamB={teamNameB}
      />

      <SearchPlayer value={searchText} onChange={onChangeText} />

      <View style={styles.container}>
        <FlatList
          data={currentTeamId == 1 ? teamA : teamB}
          keyExtractor={(item, index) => 'team_' + index}
          renderItem={({item, index}) => (
            <PlayerCard
              item={item}
              selectedIds={selectedIds}
              onPress={onPressPlayer}
            />
          )}
          ListFooterComponent={() => <View style={{height: HT(10)}}></View>}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default MatchSquads;
