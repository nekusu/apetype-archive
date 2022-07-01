import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  seconds: number;
}

const slice = createSlice({
  name: 'testStats',
  initialState: {
    seconds: 0,
  } as State,
  reducers: {
    setTimer: (state, action: PayloadAction<number | undefined>) => {
      state.seconds = action.payload || 0;
    },
    addSecond: (state) => {
      state.seconds += 1;
    },
  },
});

export const { setTimer, addSecond } = slice.actions;
export default slice.reducer;
