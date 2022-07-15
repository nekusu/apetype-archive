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
  randomTheme: {
    command: 'randomize theme',
    description: 'After loading a new test, the theme will be set to a random one.\
      If set to "light" or "dark", only presets with light or dark background colors\
      will be randomized, respectively.',
    category: 'theme',
    options: ['off', 'on', 'light', 'dark'],
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
