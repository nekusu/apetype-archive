import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'config',
  initialState: {
    mode: 'time',
    time: 15,
    words: 10,
    language: 'english',
    fontFamily: 'Lexend Deca',
    themeName: 'aurora',
    randomTheme: 'dark',
  } as ApeTypes.Config,
  reducers: {
    setMode: (state, action: PayloadAction<ApeTypes.Config['mode']>) => {
      state.mode = action.payload;
    },
    setTime: (state, action: PayloadAction<ApeTypes.Config['time']>) => {
      const time = +action.payload;
      if (!isNaN(time) && time < 3600) {
        state.time = time;
      }
    },
    setWords: (state, action: PayloadAction<ApeTypes.Config['words']>) => {
      const words = +action.payload;
      if (!isNaN(words) && words < 5000) {
        state.words = words;
      }
    },
    setLanguage: (state, action: PayloadAction<ApeTypes.Config['language']>) => {
      state.language = action.payload;
    },
    setFontFamily: (state, action: PayloadAction<ApeTypes.Config['fontFamily']>) => {
      state.fontFamily = action.payload;
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
  setFontFamily,
  setThemeName,
  setRandomTheme,
} = slice.actions;
export default slice.reducer;
