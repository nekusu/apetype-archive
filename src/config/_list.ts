/* eslint-disable @typescript-eslint/no-explicit-any */
import * as actions from '../slices/config';
import languages from '../languages/_list';
import themes from '../themes/_list';

interface ConfigItem {
  command: string;
  description?: string;
  category?: string;
  options: (string | number)[];
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
};

export default config;
