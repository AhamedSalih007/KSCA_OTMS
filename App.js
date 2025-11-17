import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import StackNav from './src/Router/StackNav';
import {Provider} from 'react-redux';
import {persistor, store} from './src/Redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <StackNav />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
