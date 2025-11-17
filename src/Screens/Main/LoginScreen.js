import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Image,
  Keyboard,
} from 'react-native';
import {bgColor} from '../../Constant/Fonts&Colors';
import {HT, WD, WIDTH} from '../../Constant/Dimensions';
import BackButton from '../../Components/Common/BackButton';
import {LoginAPI} from '../../API/PlayerAPI';
import {useDispatch} from 'react-redux';
import {userDataAction} from '../../Redux/ReducerSlices/LocalDataSlice';

const LoginScreen = props => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // console.log('Login pressed', username, password);

    Keyboard.dismiss();

    if (username == '' || password == '') {
      alert('Please enter valid credential');
    } else {
      setLoading(true);
      const responseLogin = await LoginAPI(username, password);

      if (responseLogin != 'Error') {
        if (responseLogin.Message == 'Request successful') {
          setLoading(false);
          console.log('response', responseLogin?.Data);

          dispatch(userDataAction(responseLogin?.Data));
          setUsername('');
          setPassword('');
          props.navigation.navigate('DashboardScreen');
        } else {
          setLoading(false);
          alert(`${responseLogin.Message} in given credential`);
        }
      } else {
        setLoading(false);
        alert('Something went wrong please try again');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: HT(10),
          width: WIDTH,
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: WD(3),
        }}>
        <BackButton
          color={bgColor.black}
          goBack={() => props.navigation.goBack()}
        />
      </View>

      {/* Circle Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.circle}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={require('../../Assets/Images/kscalogo.png')}
          />
        </View>
      </View>

      {/* Welcome text */}
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Log in to your account</Text>

      <View style={{height: HT(3)}} />

      {/* Username */}
      <Text style={styles.label}>Username</Text>
      <TextInput
        selectionColor={bgColor.coloured}
        style={styles.input}
        placeholder="Enter your username"
        placeholderTextColor={bgColor.black}
        value={username}
        onChangeText={setUsername}
      />

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        selectionColor={bgColor.coloured}
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor={bgColor.black}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={!loading ? handleLogin : null}>
        {!loading ? (
          <Text style={styles.loginText}>Login</Text>
        ) : (
          <ActivityIndicator size={'small'} color={bgColor.white} />
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor.bg_globe,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logoContainer: {
    marginBottom: HT(2),
    alignItems: 'center',
  },
  circle: {
    width: WD(18),
    height: WD(18),
    backgroundColor: bgColor.coloured,
    borderRadius: WD(18) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0D1B2A',
    bottom: HT(1),
  },
  subtitle: {
    fontSize: 15,
    color: '#4C596E',
    // top: HT(0.5),
  },
  label: {
    width: '90%',
    color: bgColor.black,
    fontWeight: '600',
    fontSize: 14,
    marginBottom: HT(1),
  },
  input: {
    width: '90%',
    backgroundColor: '#E9EBEF',
    borderRadius: 10,
    paddingHorizontal: WD(3),
    paddingVertical: HT(2.5),
    marginBottom: HT(2),
    color: '#0D1B2A',
  },

  loginBtn: {
    width: '90%',
    backgroundColor: bgColor.coloured,
    paddingVertical: HT(2.2),
    borderRadius: WD(2),
    alignItems: 'center',
    top: HT(2),
  },
  loginText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signupText: {
    color: '#4C596E',
    fontSize: 14,
  },
  signupLink: {
    color: '#00A79D',
    fontWeight: '600',
    fontSize: 14,
  },
});
