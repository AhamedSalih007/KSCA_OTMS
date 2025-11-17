import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import user from '../Redux/ReducerSlices/UserSlice';
import localdata from '../Redux/ReducerSlices/LocalDataSlice';

// persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['localdata'],
  blacklist: ['user'],
};

// combine reducers (if you add more slices later)
const rootReducer = combineReducers({
  user: user,
  localdata: localdata,
});

// wrap root reducer with persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store setup
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

// persistor
export const persistor = persistStore(store);
