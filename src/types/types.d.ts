declare namespace ApeTypes {
  interface Config {
    theme: Theme;
    randomTheme: 'off' | 'on' | 'light' | 'dark';
    mode: 'time' | 'words';
    time: number;
    words: number;
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
