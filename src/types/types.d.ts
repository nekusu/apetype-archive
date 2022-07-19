declare namespace ApeTypes {
  interface Config {
    mode: 'time' | 'words' | 'zen';
    time: number;
    words: number;
    quickRestart: 'off' | 'tab' | 'esc';
    blindMode: 'off' | 'on';
    language: string;
    freedomMode: 'off' | 'on';
    confidenceMode: 'off' | 'on' | 'max';
    quickEnd: 'off' | 'on';
    indicateTypos: 'off' | 'below' | 'replace';
    hideExtraLetters: 'off' | 'on';
    soundVolume: number;
    soundOnClick: 'off' | 'click' | 'beep' | 'pop' | 'nk creams' | 'typewriter' | 'osu' | 'hitmarker';
    soundOnError: 'off' | 'on';
    smoothCaret: 'off' | 'on';
    caretStyle: 'off' | 'default' | 'block' | 'outline' | 'underline';
    timerProgressStyle: 'text' | 'bar' | 'both';
    statsColor: 'sub' | 'text' | 'main';
    statsOpacity: 0.25 | 0.5 | 0.75 | 1;
    smoothLineScroll: 'off' | 'on';
    showDecimalPlaces: 'off' | 'on';
    fontSize: 16 | 20 | 24 | 36 | 48 | 64;
    fontFamily: string;
    pageWidth: '1000px' | '1250px' | '1500px' | '2000px' | '100%';
    transitionSpeed: 0.1 | 0.25 | 0.4;
    keymap: 'off' | 'static' | 'react' | 'next';
    keymapLayout: 'qwerty' | 'dvorak' | 'colemak' | 'workman';
    keymapStyle: 'staggered' | 'matrix' | 'split' | 'split matrix';
    keymapLegendStyle: 'blank' | 'lowercase' | 'uppercase' | 'dynamic';
    themeName: string;
    flipTestColors: 'off' | 'on';
    colorfulMode: 'off' | 'on';
    randomTheme: 'off' | 'on' | 'favorite' | 'light' | 'dark';
    favoriteThemes: string[];
    timerProgress: 'hide' | 'show';
    liveWpm: 'hide' | 'show';
    liveAccuracy: 'hide' | 'show';
    keyTips: 'hide' | 'show';
    outOfFocusWarning: 'hide' | 'show';
    capsLockWarning: 'hide' | 'show';
  }

  interface Letter {
    original?: string;
    typed?: string;
    status?: 'correct' | 'incorrect' | 'extra' | 'missed';
  }

  interface Word {
    original: string;
    typed?: string;
    isCorrect: boolean;
    letters: Letter[];
  }
}
