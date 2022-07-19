import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const defaultConfig = {
  mode: 'time',
  time: 15,
  words: 10,
  quickRestart: 'tab',
  blindMode: 'off',
  language: 'english',
  freedomMode: 'off',
  confidenceMode: 'off',
  quickEnd: 'on',
  indicateTypos: 'replace',
  hideExtraLetters: 'off',
  soundVolume: 0.6,
  soundOnClick: 'nk creams',
  soundOnError: 'on',
  smoothCaret: 'on',
  caretStyle: 'default',
  timerProgressStyle: 'both',
  statsColor: 'main',
  statsOpacity: 0.5,
  smoothLineScroll: 'on',
  showDecimalPlaces: 'off',
  fontSize: 1.5,
  fontFamily: 'Lexend Deca',
  pageWidth: '1250px',
  transitionSpeed: 0.25,
  keymap: 'react',
  keymapLayout: 'qwerty',
  keymapStyle: 'staggered',
  keymapLegendStyle: 'blank',
  themeName: '',
  flipTestColors: 'off',
  colorfulMode: 'on',
  favoriteThemes: [],
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
    setQuickRestart: (state, action: PayloadAction<ApeTypes.Config['quickRestart']>) => {
      state.quickRestart = action.payload;
    },
    setBlindMode: (state, action: PayloadAction<ApeTypes.Config['blindMode']>) => {
      state.blindMode = action.payload;
    },
    setLanguage: (state, action: PayloadAction<ApeTypes.Config['language']>) => {
      state.language = action.payload;
    },
    setFreedomMode: (state, action: PayloadAction<ApeTypes.Config['freedomMode']>) => {
      state.freedomMode = action.payload;
    },
    setConfidenceMode: (state, action: PayloadAction<ApeTypes.Config['confidenceMode']>) => {
      state.confidenceMode = action.payload;
    },
    setQuickEnd: (state, action: PayloadAction<ApeTypes.Config['quickEnd']>) => {
      state.quickEnd = action.payload;
    },
    setIndicateTypos: (state, action: PayloadAction<ApeTypes.Config['indicateTypos']>) => {
      state.indicateTypos = action.payload;
    },
    setHideExtraLetters: (state, action: PayloadAction<ApeTypes.Config['hideExtraLetters']>) => {
      state.hideExtraLetters = action.payload;
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
    setTimerProgressStyle: (state, action: PayloadAction<ApeTypes.Config['timerProgressStyle']>) => {
      state.timerProgressStyle = action.payload;
    },
    setStatsColor: (state, action: PayloadAction<ApeTypes.Config['statsColor']>) => {
      state.statsColor = action.payload;
    },
    setStatsOpacity: (state, action: PayloadAction<ApeTypes.Config['statsOpacity']>) => {
      state.statsOpacity = action.payload;
    },
    setSmoothLineScroll: (state, action: PayloadAction<ApeTypes.Config['smoothLineScroll']>) => {
      state.smoothLineScroll = action.payload;
    },
    setShowDecimalPlaces: (state, action: PayloadAction<ApeTypes.Config['showDecimalPlaces']>) => {
      state.showDecimalPlaces = action.payload;
    },
    setFontSize: (state, action: PayloadAction<ApeTypes.Config['fontSize']>) => {
      state.fontSize = action.payload;
    },
    setFontFamily: (state, action: PayloadAction<ApeTypes.Config['fontFamily']>) => {
      state.fontFamily = action.payload;
    },
    setPageWidth: (state, action: PayloadAction<ApeTypes.Config['pageWidth']>) => {
      state.pageWidth = action.payload;
    },
    setTransitionSpeed: (state, action: PayloadAction<ApeTypes.Config['transitionSpeed']>) => {
      state.transitionSpeed = action.payload;
    },
    setKeymap: (state, action: PayloadAction<ApeTypes.Config['keymap']>) => {
      state.keymap = action.payload;
    },
    setKeymapLayout: (state, action: PayloadAction<ApeTypes.Config['keymapLayout']>) => {
      state.keymapLayout = action.payload;
    },
    setKeymapStyle: (state, action: PayloadAction<ApeTypes.Config['keymapStyle']>) => {
      state.keymapStyle = action.payload;
    },
    setKeymapLegendStyle: (state, action: PayloadAction<ApeTypes.Config['keymapLegendStyle']>) => {
      state.keymapLegendStyle = action.payload;
    },
    setThemeName: (state, action: PayloadAction<ApeTypes.Config['themeName']>) => {
      state.themeName = action.payload;
    },
    setFlipTestColors: (state, action: PayloadAction<ApeTypes.Config['flipTestColors']>) => {
      state.flipTestColors = action.payload;
    },
    setColorfulMode: (state, action: PayloadAction<ApeTypes.Config['colorfulMode']>) => {
      state.colorfulMode = action.payload;
    },
    addFavoriteTheme: (state, action: PayloadAction<ApeTypes.Config['themeName']>) => {
      state.favoriteThemes = [...state.favoriteThemes, action.payload];
    },
    removeFavoriteTheme: (state, action: PayloadAction<ApeTypes.Config['themeName']>) => {
      state.favoriteThemes = state.favoriteThemes.filter((theme) => theme !== action.payload);
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
  setQuickRestart,
  setBlindMode,
  setLanguage,
  setFreedomMode,
  setConfidenceMode,
  setQuickEnd,
  setIndicateTypos,
  setHideExtraLetters,
  setSoundVolume,
  setSoundOnClick,
  setSoundOnError,
  setSmoothCaret,
  setCaretStyle,
  setTimerProgressStyle,
  setStatsColor,
  setStatsOpacity,
  setSmoothLineScroll,
  setShowDecimalPlaces,
  setFontSize,
  setFontFamily,
  setPageWidth,
  setTransitionSpeed,
  setKeymap,
  setKeymapLayout,
  setKeymapStyle,
  setKeymapLegendStyle,
  setThemeName,
  setFlipTestColors,
  setColorfulMode,
  addFavoriteTheme,
  removeFavoriteTheme,
  setRandomTheme,
  setTimerProgress,
  setLiveWpm,
  setLiveAccuracy,
  setKeyTips,
  setOutOfFocusWarning,
  setCapsLockWarning,
} = slice.actions;
export default slice.reducer;
