declare namespace ApeTypes {
  interface Config {
    mode: 'time' | 'words' | 'zen';
    time: number;
    words: number;
    language: string;
    themeName: string;
    randomTheme: 'off' | 'on' | 'light' | 'dark';
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
