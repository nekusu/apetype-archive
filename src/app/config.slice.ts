import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'config',
  initialState: {
    mode: 'time',
    time: 15,
  } as ApeTypes.Config,
  reducers: {
    setMode: (state, action: PayloadAction<ApeTypes.Config['mode']>) => {
      state.mode = action.payload;
    },
    setTime: (state, action: PayloadAction<ApeTypes.Config['time']>) => {
      state.time = action.payload;
    },
  },
});

export const { setMode, setTime } = slice.actions;
export default slice.reducer;
