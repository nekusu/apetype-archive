declare namespace ApeTypes {
  interface Config {
    mode: 'time';
    time: 15 | 30 | 60 | 120;
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
