import {createSlice} from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    count: 0,
    isDrawer: false,
    isBottomSheet: false,
    isRightDrawer: false,
  },
  reducers: {
    incrementCount: (state, action) => {
      state.count = state.count + 1;
    },
    drawerHandleAction: (state, action) => {
      state.isDrawer = action.payload;
    },
    rightDrawerHandleAction: (state, action) => {
      state.isRightDrawer = action.payload;
    },
    bottomSheetAction: (state, action) => {
      state.isBottomSheet = action.payload;
    },
  },
});

export const {
  incrementCount,
  bottomSheetAction,
  drawerHandleAction,
  rightDrawerHandleAction,
} = user.actions;

export default user.reducer;
