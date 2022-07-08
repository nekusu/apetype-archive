declare namespace ApeTypes {
  interface Config {
    theme: Theme;
    randomTheme: 'off' | 'on' | 'light' | 'dark';
    mode: 'time' | 'words';
    time: 15 | 30 | 60 | 120;
    words: 10 | 25 | 50 | 100;
    language: string;
  }

  interface Theme {
    name: string;
    mode: 'light' | 'dark';
    colors: DefaultTheme;
  }

  interface Letter {
    original: string;
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
