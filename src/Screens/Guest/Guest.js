import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Dimensions, Image, Text, View} from 'react-native';
import WebView from 'react-native-webview';
import {HT, WD, WIDTH} from '../../Constant/Dimensions';
import BackButton from '../../Components/Common/BackButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {bgColor} from '../../Constant/Fonts&Colors';

const {width, height} = Dimensions.get('window');

const Guest = props => {
  // const [currentUrl,setCurrentUrl]=useState("");
  const [isLogoHide, setIsLogoHide] = useState(false);

  // const getUrl = async () => {
  //   var url = await AsyncStorage.getItem('url');

  //   console.log('url', url);

  //  if(url!=null){

  //  }
  //  else{
  // setCurrentUrl('https://ksca.cricket-21.com/tms23/Login/Index');
  //  }

  // };

  const onNavigationStateChange = async navState => {
    // this.currentUrl = navState.url;
    // console.log('nav--->', navState);
    //  if(navState.title=="Dashboard"){
    //   await AsyncStorage.setItem("url",navState.url)
    //  }
    //  else if(navState.title==""){
    //  }
  };

  const loadingComponent = () => {
    return (
      <ActivityIndicator
        size={'large'}
        color={'#0948b3'}
        style={{bottom: (height / 100) * 50}}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        startInLoadingState={true}
        source={{
          uri: 'https://cloud.cricket-21.com/AMS/',
        }}
        style={{flex: 1}}
        renderLoading={() => loadingComponent()}
        onNavigationStateChange={onNavigationStateChange}
      />
      <View
        style={{
          height: HT(10),
          width: WIDTH,
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: WD(3),
          position: 'absolute',
          top: HT(6),
          zIndex: 10,
        }}>
        <BackButton
          color={bgColor.black}
          goBack={() => props.navigation.goBack()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Guest;
