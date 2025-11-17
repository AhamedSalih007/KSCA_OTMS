import {Dimensions} from 'react-native';

export const WIDTH = Dimensions.get('window').width;

export const HEIGHT = Dimensions.get('window').height;

export const WD = percentage => {
  const widthPercentage = (WIDTH / 100) * percentage;

  return widthPercentage;
};

export const HT = percentage => {
  const heightPercentage = (HEIGHT / 100) * percentage;

  return heightPercentage;
};
