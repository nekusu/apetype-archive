import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'config',
  initialState: {
    theme: {
      name: '8008',
      mode: 'dark',
    },
    randomTheme: 'dark',
    mode: 'time',
    time: 15,
    language: 'english',
  } as ApeTypes.Config,
  reducers: {
    setTheme: (state, action: PayloadAction<ApeTypes.Config['theme']>) => {
      state.theme = action.payload;
    },
    setRandomTheme: (state, action: PayloadAction<ApeTypes.Config['randomTheme']>) => {
      state.randomTheme = action.payload;
    },
    setMode: (state, action: PayloadAction<ApeTypes.Config['mode']>) => {
      state.mode = action.payload;
    },
    setTime: (state, action: PayloadAction<ApeTypes.Config['time']>) => {
      state.time = action.payload;
    },
    setLanguage: (state, action: PayloadAction<ApeTypes.Config['language']>) => {
      state.language = action.payload;
    },
  },
});

export const {
  setTheme,
  setRandomTheme,
  setMode,
  setTime,
  setLanguage,
} = slice.actions;
export default slice.reducer;
