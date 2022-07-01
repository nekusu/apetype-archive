declare namespace ApeTypes {
  interface Config {
    theme: Theme;
    randomTheme: 'off' | 'on' | 'light' | 'dark';
    mode: 'time';
    time: 15 | 30 | 60 | 120;
    language: string;
  }

  interface Theme {
    name: string;
    mode: 'light' | 'dark';
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
