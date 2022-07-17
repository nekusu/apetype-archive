declare namespace ApeTypes {
  interface Config {
    mode: 'time' | 'words' | 'zen';
    time: number;
    words: number;
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
    fontFamily: string;
    themeName: string;
    randomTheme: 'off' | 'on' | 'light' | 'dark';
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
