/* eslint-disable @typescript-eslint/no-explicit-any */
import * as actions from '../slices/config';
import languages from '../languages/_list';
import themes from '../themes/_list';

interface ConfigItem {
  command: string;
  description?: string;
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
    options: languages,
    action: actions.setLanguage,
  },
  fontFamily: {
    command: 'font family',
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
    options: themes.map((t) => t.name),
    action: actions.setThemeName,
  },
  randomTheme: {
    command: 'randomize theme',
    description: 'After completing a test, the theme will be set to a random one.\
      The random themes are not saved to your config. If set to "light" or "dark",\
      only presets with light or dark background colors will be randomized, respectively.',
    options: ['off', 'on', 'light', 'dark'],
    action: actions.setRandomTheme,
  },
};

export default config;
