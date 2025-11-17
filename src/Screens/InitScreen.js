import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Image,
} from 'react-native';
import {bgColor, fontSize} from '../Constant/Fonts&Colors';
import {HT} from '../Constant/Dimensions';

const InitScreen = props => {
  const onPressedBtn = id => {
    // console.log('id', id);
    // GUEST
    if (id == 1) {
      props.navigation.navigate('Guest');
    }
    // LOGIN
    else {
      props.navigation.navigate('LoginScreen');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          textAlign: 'center',
          color: bgColor.white,
          top: HT(5),
          fontWeight: 'bold',
          fontSize: fontSize.Large,
        }}>
        KSCA OTMS
      </Text>
      <Image
        resizeMode="contain"
        style={{width: '70%', height: '13%', alignSelf: 'center', top: HT(8)}}
        source={require('../Assets/Images/kscalogo.png')}
      />
      {/* Background Section */}
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require('../Assets/Images/groundBig.png')}
          style={styles.imageBackground}
          imageStyle={styles.imageRadius}
        />
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => onPressedBtn(1)}
          style={[styles.button, styles.guestButton]}>
          <Text style={styles.buttonText}>Guest</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onPressedBtn(2)}
          style={[styles.button, styles.loginButton]}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footerSpace} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101a23',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageBackground: {
    width: '100%',
    height: HT(40),
    backgroundColor: '#101a23',
  },
  imageRadius: {
    borderRadius: 12,
  },
  buttonContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  button: {
    width: '100%',
    maxWidth: 480,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  guestButton: {
    backgroundColor: '#223649',
  },
  loginButton: {
    backgroundColor: '#0b72da',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.15,
  },
  footerSpace: {
    height: 20,
    backgroundColor: '#101a23',
  },
});

export default InitScreen;
