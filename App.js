import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

const App = () => {
  // const [currentUrl,setCurrentUrl]=useState("");
  const [isLogoHide, setIsLogoHide] = useState(false);

  useEffect(() => {
    // getUrl();

    setTimeout(() => {
      setIsLogoHide(true);
    }, 1000);
  }, []);

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
      {isLogoHide ? (
        <WebView
          startInLoadingState={true}
          source={{
            uri: 'https://cloud.cricket-21.com/AMS/',
          }}
          style={{flex: 1}}
          renderLoading={() => loadingComponent()}
          onNavigationStateChange={onNavigationStateChange}
        />
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              width: '40%',
              height: '20%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              resizeMode="contain"
              style={{width: '80%', height: '60%'}}
              source={require('./src/Assets/Images/kscalogo.png')}
            />
            <Text
              style={{
                top: (height / 100) * 2,
                opacity: 0.8,
                fontWeight: '800',
                color: 'black',
              }}>
              KSCA OTMS
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default App;
