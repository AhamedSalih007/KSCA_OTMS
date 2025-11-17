import React, {useCallback} from 'react';
import {Alert, FlatList, Pressable, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MainStyle} from '../../../Constant/Styles';
import MainHeaderView from '../../../Components/Common/MainHeaderView';
import {useDispatch} from 'react-redux';
import {
  drawerHandleAction,
  rightDrawerHandleAction,
} from '../../../Redux/ReducerSlices/UserSlice';
import MoreCard from '../../../Components/More/MoreCard';
import {HT, WD, WIDTH} from '../../../Constant/Dimensions';
import {bgColor, fontSize} from '../../../Constant/Fonts&Colors';
import {userDataAction} from '../../../Redux/ReducerSlices/LocalDataSlice';

const More = props => {
  const dispatch = useDispatch();

  const pressedDrawer = useCallback(() => {
    dispatch(drawerHandleAction(true));
  }, []);

  const pressedRightDrawer = useCallback(() => {
    dispatch(rightDrawerHandleAction(true));
  }, []);

  const moreArray = [
    {
      id: 1,
      name: 'Schedule',
      image: require('../../../Assets/Images/schedule.png'),
      colorBg: '#E9F2F5',
      colorIcon: '#107D9E',
    },
    {
      id: 2,
      name: 'Drills',
      image: require('../../../Assets/Images/gym.png'),
      colorBg: '#EBF6FD',
      colorIcon: '#0BA5E9',
    },
    {
      id: 3,
      name: 'Competitions',
      image: require('../../../Assets/Images/trophy.png'),
      colorBg: '#FEF6EA',
      colorIcon: '#F59E0B',
    },
    {
      id: 4,
      name: 'Stats',
      image: require('../../../Assets/Images/stats.png'),
      colorBg: '#DCFCE7',
      colorIcon: '#1BC458',
    },
    {
      id: 5,
      name: 'Training Resources',
      image: require('../../../Assets/Images/open-book.png'),
      colorBg: '#E9F2F5',
      colorIcon: '#107D9E',
    },
    {
      id: 6,
      name: 'About',
      image: require('../../../Assets/Images/info.png'),
      colorBg: '#E9F2F5',
      colorIcon: '#64748B',
    },
  ];

  const pressedMoreCard = (item, index) => {
    console.log('pressed more card', item, index);

    if (item.name == 'Schedule') {
      props.navigation.navigate('Schedule_Wellness');
    }
  };

  const renderItem = useCallback((item, index) => {
    return (
      <MoreCard
        colorBg={item.colorBg}
        colorIcon={item.colorIcon}
        image={item.image}
        name={item.name}
        isBottomSheet={false}
        pressedMoreCard={() => pressedMoreCard(item, index)}
      />
    );
  }, []);

  const logout = () => {
    dispatch(userDataAction(null));
    props.navigation.replace('InitScreen');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => logout(),
        },
      ],
      {cancelable: true},
    );
  };

  const logoutView = () => {
    return (
      <Pressable
        onPress={handleLogout}
        style={{
          width: WD(20),
          height: HT(5),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: bgColor.white,
          top: HT(2.5),
          shadowColor: bgColor.grey,
          shadowOffset: {width: 0.5, height: 0.5},
          shadowOpacity: 0.2,
          borderRadius: WD(1.5),
        }}>
        <Text style={{color: bgColor.black, fontSize: fontSize.Medium}}>
          Logout
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={MainStyle}>
      <MainHeaderView
        screenName={'More'}
        pressedDrawer={pressedDrawer}
        pressedRightDrawer={pressedRightDrawer}
      />

      <View style={{width: WIDTH, height: HT(93)}}>
        <FlatList
          contentContainerStyle={{alignItems: 'center', top: HT(0.5)}}
          data={moreArray}
          renderItem={({item, index}) => renderItem(item, index)}
          ListFooterComponent={() => (
            <View
              style={{
                height: HT(30),
                width: HT(10),
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              {logoutView()}
            </View>
          )}
        />
      </View>

      <MoreCard />
    </SafeAreaView>
  );
};

export default More;
