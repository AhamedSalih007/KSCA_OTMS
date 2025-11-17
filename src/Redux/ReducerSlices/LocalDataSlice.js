import {createSlice} from '@reduxjs/toolkit';

const localData = createSlice({
  name: 'localdata',
  initialState: {
    userData: null,
    darkMode: false,
    tagList: {},
  },
  reducers: {
    userDataAction: (state, action) => {
      state.userData = action.payload;
    },
    darkModeAction: (state, action) => {
      state.darkMode = action.payload;
    },
    tagListAction: (state, action) => {
      state.tagList = action.payload;
    },
  },
});

export const {userDataAction, darkModeAction, tagListAction} =
  localData.actions;

export default localData.reducer;
