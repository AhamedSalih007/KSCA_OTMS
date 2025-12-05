import {Dimensions, StyleSheet, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

// export const fontFamily = {
//   MontserratReg: 'Montserrat-Regular',
//   MontserratLight: 'Montserrat-ExtraLightItalic',
//   MontserratXlight: 'Montserrat-LightItalic',
//   MontserratThin: 'Montserrat-Thin',
//   MontserratBold: 'Montserrat-Bold',
//   Anek: 'AnekOdia-Bold',
// };

export const fontSize = {
  verySmall_50:
    Platform.OS == 'android' ? (width / 100) * 2.4 : (width / 100) * 2.1,
  veryverySmall:
    Platform.OS == 'android' ? (width / 100) * 2.6 : (width / 100) * 2.3,
  verySmall:
    Platform.OS == 'android' ? (width / 100) * 2.8 : (width / 100) * 2.6,
  verySmall_75:
    Platform.OS == 'android' ? (width / 100) * 3.0 : (width / 100) * 2.8,
  Small: Platform.OS == 'android' ? (width / 100) * 3.2 : (width / 100) * 3.1,
  lightMedium_50:
    Platform.OS == 'android' ? (width / 100) * 3.5 : (width / 100) * 3.3,
  lightMedium:
    Platform.OS == 'android' ? (width / 100) * 3.7 : (width / 100) * 3.5,
  Medium: Platform.OS == 'android' ? (width / 100) * 4.2 : (width / 100) * 4,
  Large_50:
    Platform.OS == 'android' ? (width / 100) * 4.5 : (width / 100) * 4.3,
  Large: Platform.OS == 'android' ? (width / 100) * 4.7 : (width / 100) * 4.5,
  ExtraLarge_50:
    Platform.OS == 'android' ? (width / 100) * 5 : (width / 100) * 4.7,
  ExtraLarge_100:
    Platform.OS == 'android' ? (width / 100) * 6 : (width / 100) * 5.8,
  ExtraLarge:
    Platform.OS == 'android' ? (width / 100) * 5.2 : (width / 100) * 5,
};

export const bgColor = {
  bg_globe: '#F9FAFB',
  coloured: '#107D9E',
  secondaryMain: '#E0F2F6',
  tertiaryMain: '#FFFFFF',
  bg_island: '#24232A',
  on_island: '#313038',
  bg_island_hover: '#3B3A42',
  text_secondary: '#E2E2E2',
  text_primary: '#FFFFFF',
  icons_tertiary: '#9F9F9F',
  text_tertiary: '#9F9F9F',
  text_accentPrimary: '#B19CFF',
  accentSecondary: '#B5DB1C',
  icons_primary: '#FFFFFF',
  divider_light: '#303030',
  white: '#fff',
  grey: 'grey',
  black: 'black',
  green: '#2aa952',
  red: 'red',
  greyLight: '#E9ECF',
  borderStroke: '#41414A',
  borderGrey: '#ddd',
};

export const lightTheme = {
  bgColor: '#F9FAFB',
  viewColor: '#FFFFFF',
  textColor: 'black',
  selectedButtonColor: 'white',
  primary: '#107D9E',
  secondary: '#E0F2F6',
  inputColor: '#F3F4F6',
  tertiary: '#E6E7EB',
};

export const darkTheme = {
  bgColor: '#0D1628',
  viewColor: '#1E293B',
  textColor: 'white',
  selectedButtonColor: 'black',
  primary: '#05B6D4',
  secondary: '#1F3A4D',
};
