/* eslint-disable @typescript-eslint/no-explicit-any */
import * as actions from '../slices/config';
import languages from '../languages/_list';
import themes from '../themes/_list';

interface ConfigItem {
  command: string;
  description?: string;
  category?: string;
  options: (string | number)[];
  altOptions?: (string | number)[];
  showAltOptions?: boolean;
  custom?: boolean;
  action: (arg: any) => any;
}

const config: { [index: string]: ConfigItem; } = {
  mode: {
    command: 'mode',
    options: ['time', 'words', 'zen'],
    action: actions.setMode,
  },
  time: {
    command: 'time',
    options: [15, 30, 60, 120],
    custom: true,
    action: actions.setTime,
  },
  words: {
    command: 'words',
    options: [10, 25, 50, 100],
    custom: true,
    action: actions.setWords,
  },
  language: {
    command: 'language',
    description: 'Change in which language you want to type.',
    category: 'behavior',
    options: languages,
    action: actions.setLanguage,
  },
  freedomMode: {
    command: 'freedom mode',
    description: 'Allows you to delete any word, even if it was typed correctly.',
    category: 'input',
    options: ['off', 'on'],
    action: actions.setFreedomMode,
  },
  confidenceMode: {
    command: 'confidence mode',
    description: 'When enabled, you will not be able to go back to previous words to fix mistakes.\
      When turned up to the max, you won\'t be able to backspace at all.',
    category: 'input',
    options: ['off', 'on', 'max'],
    action: actions.setConfidenceMode,
  },
  quickEnd: {
    command: 'quick end',
    description: 'This only applies to the words mode - when enabled, the test will end as soon\
      as the last word has been typed, even if it\'s incorrect. When disabled, you need to\
      manually confirm the last incorrect entry with a space.',
    category: 'input',
    options: ['off', 'on'],
    action: actions.setQuickEnd,
  },
  indicateTypos: {
    command: 'indicate typos',
    description: 'Shows typos that you\'ve made. Below shows what you typed below the letters and\
      replace will replace the letters with the ones you typed.',
    category: 'input',
    options: ['off', 'below', 'replace'],
    action: actions.setIndicateTypos,
  },
  hideExtraLetters: {
    command: 'hide extra letters',
    description: 'Hides extra letters. This will completely avoid words jumping lines (due to\
      changing width), but might feel a bit confusing when you press a key and nothing happens.',
    category: 'input',
    options: ['off', 'on'],
    action: actions.setHideExtraLetters,
  },
  soundVolume: {
    command: 'sound volume',
    description: 'Change the volume of the sound effects.',
    category: 'sound',
    options: [0.2, 0.6, 1],
    altOptions: ['quiet', 'medium', 'loud'],
    showAltOptions: true,
    action: actions.setSoundVolume,
  },
  soundOnClick: {
    command: 'sound on click',
    description: 'Plays a short sound when you press a key.',
    category: 'sound',
    options: ['off', 'click', 'beep', 'pop', 'nk creams', 'typewriter', 'osu', 'hitmarker'],
    action: actions.setSoundOnClick,
  },
  soundOnError: {
    command: 'sound on error',
    description: 'Plays a short sound if you press an incorrect key or press space too early.',
    category: 'sound',
    options: ['off', 'on'],
    action: actions.setSoundOnError,
  },
  smoothCaret: {
    command: 'smooth caret',
    description: 'When enabled, the caret will move smoothly between letters and words.',
    category: 'caret',
    options: ['off', 'on'],
    action: actions.setSmoothCaret,
  },
  caretStyle: {
    command: 'caret style',
    description: 'Change the style of the caret during the test.',
    category: 'caret',
    options: ['off', 'default', 'block', 'outline', 'underline'],
    altOptions: ['off', '|', '▮', '▯', '_'],
    action: actions.setCaretStyle,
  },
  fontFamily: {
    command: 'font family',
    description: 'Change the font family used troughout the website. If set to custom,\
      make sure you have the font installed on your device before applying.',
    category: 'appearance',
    options: [
      'Fira Code',
      'Inconsolata',
      'JetBrains Mono',
      'Lato',
      'Lexend Deca',
      'Montserrat',
      'Nunito',
      'Oxygen',
      'Roboto',
      'Roboto Mono',
      'Source Code Pro',
      'Ubuntu',
      'Ubuntu Mono',
    ],
    custom: true,
    action: actions.setFontFamily,
  },
  themeName: {
    command: 'theme',
    description: 'Change the color palette.',
    category: 'theme',
    options: themes.map((t) => t.name),
    action: actions.setThemeName,
  },
  flipTestColors: {
    command: 'flip test colors',
    description: 'By default, typed text is brighter than the future text. When enabled, the\
      colors will be flipped and the future text will be brighter than the already typed text.',
    category: 'theme',
    options: ['off', 'on'],
    action: actions.setFlipTestColors,
  },
  colorfulMode: {
    command: 'colorful mode',
    description: 'When enabled, the test words will use the main color, instead of the text\
      color, making the website more colorful.',
    category: 'theme',
    options: ['off', 'on'],
    action: actions.setColorfulMode,
  },
  randomTheme: {
    command: 'randomize theme',
    description: 'After loading a new test, the theme will be set to a random one. If set to\
      "favorite" only favorite themes will be randomized. If set to "light" or "dark", only\
      presets with light or dark background colors will be randomized, respectively.',
    category: 'theme',
    options: ['off', 'on', 'favorite', 'light', 'dark'],
    action: actions.setRandomTheme,
  },
  timerProgress: {
    command: 'timer/progress',
    description: 'Displays a live timer for timed tests and progress for words tests.',
    category: 'hide elements',
    options: ['hide', 'show'],
    action: actions.setTimerProgress,
  },
  liveWpm: {
    command: 'live wpm',
    description: 'Displays a live WPM speed during the test. Updates once every second.',
    category: 'hide elements',
    options: ['hide', 'show'],
    action: actions.setLiveWpm,
  },
  liveAccuracy: {
    command: 'live accuracy',
    description: 'Displays live accuracy during the test.',
    category: 'hide elements',
    options: ['hide', 'show'],
    action: actions.setLiveAccuracy,
  },
  keyTips: {
    command: 'key tips',
    description: 'Shows keybind tips across the website.',
    category: 'hide elements',
    options: ['hide', 'show'],
    action: actions.setKeyTips,
  },
  outOfFocusWarning: {
    command: 'out of focus warning',
    description: 'Shows an out of focus reminder after 1 second of being \'out of focus\'\
      (not being able to type).',
    category: 'hide elements',
    options: ['hide', 'show'],
    action: actions.setOutOfFocusWarning,
  },
  capsLockWarning: {
    command: 'caps lock warning',
    description: 'Displays a warning when caps lock is on.',
    category: 'hide elements',
    options: ['hide', 'show'],
    action: actions.setCapsLockWarning,
  },
};

export default config;
