import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'config',
  initialState: {
    mode: 'time',
    time: 15,
    words: 10,
    language: 'english',
    themeName: 'aurora',
    randomTheme: 'dark',
  } as ApeTypes.Config,
  reducers: {
    setMode: (state, action: PayloadAction<ApeTypes.Config['mode']>) => {
      state.mode = action.payload;
    },
    setTime: (state, action: PayloadAction<ApeTypes.Config['time']>) => {
      state.time = action.payload;
    },
    setWords: (state, action: PayloadAction<ApeTypes.Config['words']>) => {
      state.words = action.payload;
    },
    setLanguage: (state, action: PayloadAction<ApeTypes.Config['language']>) => {
      state.language = action.payload;
    },
    setThemeName: (state, action: PayloadAction<ApeTypes.Config['themeName']>) => {
      state.themeName = action.payload;
    },
    setRandomTheme: (state, action: PayloadAction<ApeTypes.Config['randomTheme']>) => {
      state.randomTheme = action.payload;
    },
  },
});

export const {
  setMode,
  setTime,
  setWords,
  setLanguage,
  setThemeName,
  setRandomTheme,
} = slice.actions;
export default slice.reducer;
