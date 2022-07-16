import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const defaultConfig = {
  mode: 'time',
  time: 15,
  words: 10,
  language: 'english',
  soundVolume: 0.6,
  soundOnClick: 'nk creams',
  soundOnError: 'on',
  smoothCaret: 'on',
  caretStyle: 'default',
  fontFamily: 'Lexend Deca',
  themeName: '',
  randomTheme: 'on',
  timerProgress: 'show',
  liveWpm: 'show',
  liveAccuracy: 'show',
  keyTips: 'show',
  outOfFocusWarning: 'show',
  capsLockWarning: 'show',
};
const savedConfig = localStorage.getItem('config');
const initialState: ApeTypes.Config = savedConfig
  ? { ...defaultConfig, ...JSON.parse(savedConfig) }
  : defaultConfig;

const slice = createSlice({
  name: 'config',
  initialState,
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
    setSoundVolume: (state, action: PayloadAction<ApeTypes.Config['soundVolume']>) => {
      state.soundVolume = action.payload;
    },
    setSoundOnClick: (state, action: PayloadAction<ApeTypes.Config['soundOnClick']>) => {
      state.soundOnClick = action.payload;
    },
    setSoundOnError: (state, action: PayloadAction<ApeTypes.Config['soundOnError']>) => {
      state.soundOnError = action.payload;
    },
    setSmoothCaret: (state, action: PayloadAction<ApeTypes.Config['smoothCaret']>) => {
      state.smoothCaret = action.payload;
    },
    setCaretStyle: (state, action: PayloadAction<ApeTypes.Config['caretStyle']>) => {
      state.caretStyle = action.payload;
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
    setTimerProgress: (state, action: PayloadAction<ApeTypes.Config['timerProgress']>) => {
      state.timerProgress = action.payload;
    },
    setLiveWpm: (state, action: PayloadAction<ApeTypes.Config['liveWpm']>) => {
      state.liveWpm = action.payload;
    },
    setLiveAccuracy: (state, action: PayloadAction<ApeTypes.Config['liveAccuracy']>) => {
      state.liveAccuracy = action.payload;
    },
    setKeyTips: (state, action: PayloadAction<ApeTypes.Config['keyTips']>) => {
      state.keyTips = action.payload;
    },
    setOutOfFocusWarning: (state, action: PayloadAction<ApeTypes.Config['outOfFocusWarning']>) => {
      state.outOfFocusWarning = action.payload;
    },
    setCapsLockWarning: (state, action: PayloadAction<ApeTypes.Config['capsLockWarning']>) => {
      state.capsLockWarning = action.payload;
    },
  },
});

export const {
  setMode,
  setTime,
  setWords,
  setLanguage,
  setSoundVolume,
  setSoundOnClick,
  setSoundOnError,
  setSmoothCaret,
  setCaretStyle,
  setFontFamily,
  setThemeName,
  setRandomTheme,
  setTimerProgress,
  setLiveWpm,
  setLiveAccuracy,
  setKeyTips,
  setOutOfFocusWarning,
  setCapsLockWarning,
} = slice.actions;
export default slice.reducer;
