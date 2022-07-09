import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  rawWords: string[];
  testWords: ApeTypes.Word[];
  wordIndex: number;
  inputValue: string;
  raw: number;
  wpm: number;
  characterCount: number;
  errorCount: number;
  stats: {
    raw: number[];
    wpm: number[];
    characterCount: number[];
    errorCount: number[];
  };
  timer: number;
  startTime: number;
  elapsedTime: number;
  isReady: boolean;
  isRunning: boolean;
  isTyping: boolean;
  isFinished: boolean;
}

const initialState: State = {
  rawWords: [],
  testWords: [],
  wordIndex: 0,
  inputValue: ' ',
  raw: 0,
  wpm: 0,
  characterCount: 0,
  errorCount: 0,
  stats: {
    raw: [],
    wpm: [],
    characterCount: [],
    errorCount: [],
  },
  timer: Infinity,
  startTime: 0,
  elapsedTime: 0,
  isReady: false,
  isRunning: false,
  isTyping: false,
  isFinished: false,
};

const slice = createSlice({
  name: 'typingTest',
  initialState,
  reducers: {
    setRawWords: (state, action: PayloadAction<string[]>) => {
      state.rawWords = action.payload;
    },
    setTestWords: (state, action: PayloadAction<string[]>) => {
      state.testWords = action.payload.map((word) => ({
        original: word,
        isCorrect: false,
        letters: [...word].map((letter) => ({ original: letter })),
      }));
      state.isReady = true;
    },
    checkInput: (state, action: PayloadAction<string>) => {
      const value = action.payload;
      const trimmedValue = value.trim();
      const typedLetters = [...trimmedValue];
      const word = state.testWords[state.wordIndex];
      const letters = [...word.letters];

      typedLetters.forEach((typedLetter, index) => {
        const letter = letters[index];
        if (!letter) {
          state.characterCount++;
          state.errorCount++;
          letters.push({
            original: '',
            typed: typedLetter,
            status: 'extra',
          });
        } else if (letter.typed !== typedLetter) {
          state.characterCount++;
          letter.typed = typedLetter;
          if (letter.original !== typedLetter) {
            state.errorCount++;
            letter.status = 'incorrect';
          } else {
            letter.status = 'correct';
          }
        }
      });

      letters.forEach((_, index) => {
        const typedLetter = typedLetters[index];
        const letter = letters[index];
        if (typedLetter) return;
        if (letter.status === 'extra') {
          letters.pop();
        } else {
          letter.typed = '';
          letter.status = undefined;
        }
      });

      state.testWords[state.wordIndex] = {
        original: word.original,
        typed: trimmedValue,
        isCorrect: word.original === trimmedValue,
        letters,
      };

      if (!value) {
        state.inputValue = ' ';
        if (state.wordIndex > 0) {
          const previousIndex = state.wordIndex - 1;
          const previousWord = state.testWords[previousIndex];
          previousWord.letters.forEach((letter) => {
            if (!letter.typed) {
              letter.status = undefined;
            }
          });
          state.inputValue += previousWord.typed;
          state.wordIndex--;
        }
      } else if (value.endsWith(' ')) {
        state.inputValue = ' ';
        if (value.length > 2) {
          let isError = false;
          state.testWords[state.wordIndex].letters.forEach((letter) => {
            if (!letter.typed) {
              isError = true;
              letter.status = 'missed';
            }
          });
          if (isError) {
            state.errorCount++;
          }
          state.characterCount++;
          state.wordIndex++;
        }
      } else {
        state.inputValue = value;
      }
    },
    updateStats: (state) => {
      const { stats } = state;
      let rawText = '';
      let wpmText = '';
      for (let i = 0; i <= state.wordIndex; i++) {
        const word = state.testWords[i];
        if (!word) continue;
        if (word.isCorrect) {
          wpmText += ` ${word.typed}`;
        }
        rawText += ` ${word.typed || ''}`;
      }
      wpmText = wpmText.trim();
      rawText = rawText.trim();
      const elapsedTime = (performance.now() - state.startTime) / 1000;
      const characterCount = state.characterCount - stats.characterCount.reduce((a, b) => a + b, 0);
      const raw = characterCount / 5 / ((elapsedTime - state.elapsedTime) / 60);
      const wpm = wpmText.length / 5 / (elapsedTime / 60);
      const errorCount = state.errorCount - stats.errorCount.reduce((a, b) => a + b, 0);
      stats.raw.push(raw);
      stats.wpm.push(wpm);
      stats.characterCount.push(characterCount);
      stats.errorCount.push(errorCount);
      state.raw = rawText.length / 5 / (elapsedTime / 60);
      state.wpm = wpm;
      state.elapsedTime = elapsedTime;
    },
    setTimer: (state, action: PayloadAction<number>) => {
      state.timer = action.payload;
      state.isRunning = true;
    },
    decrementTimer: (state) => {
      state.timer--;
    },
    setIsReady: (state, action: PayloadAction<boolean>) => {
      state.isReady = action.payload;
    },
    setIsTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload;
    },
    setIsFinished: (state, action: PayloadAction<boolean>) => {
      state.isFinished = action.payload;
    },
    startTest: (state) => {
      state.startTime = performance.now();
      state.isRunning = true;
    },
    endTest: (state) => {
      state.isReady = false;
      state.isRunning = false;
      state.isTyping = false;
      state.isFinished = true;
    },
    resetTest: (state) => {
      const { rawWords } = state;
      Object.assign(state, initialState);
      state.rawWords = rawWords;
    },
  },
});

export const {
  setRawWords,
  setTestWords,
  checkInput,
  updateStats,
  setTimer,
  decrementTimer,
  setIsReady,
  setIsTyping,
  setIsFinished,
  startTest,
  endTest,
  resetTest,
} = slice.actions;
export default slice.reducer;
