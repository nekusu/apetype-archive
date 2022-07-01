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
    setTimer: (state, action: PayloadAction<number>) => {
      state.seconds = action.payload;
    },
    incrementTimer: (state) => {
      state.seconds += 1;
    },
    decrementTimer: (state) => {
      state.seconds -= 1;
    },
  },
});

export const { setTimer, incrementTimer, decrementTimer } = slice.actions;
export default slice.reducer;
