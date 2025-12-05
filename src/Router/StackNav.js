import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import InitScreen from '../Screens/InitScreen';
import SplashScreen from '../Screens/SplashScreen';
import Guest from '../Screens/Guest/Guest';
import DashboardScreen from '../Screens/Main/DashboardScreen';
import LoginScreen from '../Screens/Main/LoginScreen';
import DailyWellnessForm from '../Screens/Main/Wellness/DailyWellnessForm';
import Schedule_Wellness from '../Screens/Main/Wellness/Schedule_Wellness';
import VideoMain from '../Screens/Main/Video/VideoMain';
import DrawingCanvas from '../Screens/Main/Video/DrawingCanvas';
import AudioRecorderButton from '../Components/Video/AudioRecorder';
import CustomSlider from '../Components/Video/CustomSlider';
import AssignedPlayers_Coach from '../Screens/Main/Home/AssignedPlayers_Coach';
import VideosHome from '../Screens/Main/Video/VideosHome';
import MatchSquads from '../Screens/Main/BottomTabScreens/ScoutingTabs/ScoutHome/MatchSquads';
import FormDataPlayers from '../Screens/Main/BottomTabScreens/ScoutingTabs/ScoutHome/FormDataPlayers';
import CompetitionStats from '../Screens/Main/BottomTabScreens/ScoutingTabs/Competition/CompetitionStats';
import RequirementTracker2 from '../Screens/Main/BottomTabScreens/ScoutingTabs/RequirementTracker/RequirementTracker2';
import PlayerProfile from '../Screens/Main/BottomTabScreens/ScoutingTabs/PlayerProfile';
import Scorecard from '../Screens/Main/BottomTabScreens/ScoutingTabs/Scorecard';
import SessionPlayers from '../Screens/Main/BottomTabScreens/CoachTabs/CoachHome/SessionPlayers';

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            ...TransitionPresets.DefaultTransition,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="InitScreen"
          component={InitScreen}
          options={{
            ...TransitionPresets.DefaultTransition,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Guest"
          component={Guest}
          options={{
            ...TransitionPresets.DefaultTransition,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            ...TransitionPresets.DefaultTransition,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{
            ...TransitionPresets.DefaultTransition,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DailyWellnessForm"
          component={DailyWellnessForm}
          options={{
            ...TransitionPresets.DefaultTransition,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Schedule_Wellness"
          component={Schedule_Wellness}
          options={{
            ...TransitionPresets.DefaultTransition,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="VideoMain"
          component={VideoMain}
          options={{
            ...TransitionPresets.DefaultTransition,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DrawingCanvas"
          component={DrawingCanvas}
          options={{
            ...TransitionPresets.DefaultTransition,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AudioRecorder"
          component={AudioRecorderButton}
          options={{
            ...TransitionPresets.DefaultTransition,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CustomSlider"
          component={CustomSlider}
          options={{
            ...TransitionPresets.DefaultTransition,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AssignedPlayers_Coach"
          component={AssignedPlayers_Coach}
          options={{
            ...TransitionPresets.DefaultTransition,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="VideosHome"
          component={VideosHome}
          options={{
            ...TransitionPresets.DefaultTransition,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MatchSquads"
          component={MatchSquads}
          options={{
            ...TransitionPresets.DefaultTransition,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FormDataPlayers"
          component={FormDataPlayers}
          options={{
            ...TransitionPresets.DefaultTransition,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CompetitionStats"
          component={CompetitionStats}
          options={{
            ...TransitionPresets.DefaultTransition,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RequirementTracker2"
          component={RequirementTracker2}
          options={{
            ...TransitionPresets.DefaultTransition,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PlayerProfile"
          component={PlayerProfile}
          options={{
            ...TransitionPresets.DefaultTransition,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Scorecard"
          component={Scorecard}
          options={{
            ...TransitionPresets.DefaultTransition,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SessionPlayers"
          component={SessionPlayers}
          options={{
            ...TransitionPresets.DefaultTransition,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNav;
