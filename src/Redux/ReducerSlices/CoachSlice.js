import {createSlice} from '@reduxjs/toolkit';

const coachData = createSlice({
  name: 'coachdata',
  initialState: {
    session: [],
    players: [],
    coaches: [],
  },
  reducers: {
    sessionAction: (state, action) => {
      state.session = action.payload;
    },
    playersAction: (state, action) => {
      state.players = action.payload;
    },
    coachesAction: (state, action) => {
      state.coaches = action.payload;
    },
  },
});

export const {sessionAction, playersAction, coachesAction} = coachData.actions;

export default coachData.reducer;
