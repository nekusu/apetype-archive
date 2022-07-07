import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  rawWords: string[];
  words: ApeTypes.Word[];
  wordIndex: number;
  inputValue: string;
  raw: number;
  wpm: number;
  characters: number;
  errors: number;
  dataset: {
    raw: number[];
    wpm: number[];
    characters: number[];
    errors: number[];
  };
  timer: number;
  elapsedTime: number;
  isReady: boolean;
  isRunning: boolean;
  isTyping: boolean;
  isFinished: boolean;
}

const initialState: State = {
  rawWords: [],
  words: [],
  wordIndex: 0,
  inputValue: ' ',
  raw: 0,
  wpm: 0,
  characters: 0,
  errors: 0,
  dataset: {
    raw: [],
    wpm: [],
    characters: [],
    errors: [],
  },
  timer: 0,
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
    setWords: (state, action: PayloadAction<string[]>) => {
      state.words = action.payload.map((word) => ({
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
      const word = state.words[state.wordIndex];
      const letters = [...word.letters];

      typedLetters.forEach((typedLetter, index) => {
        const letter = letters[index];
        if (!letter) {
          state.characters++;
          state.errors++;
          letters.push({
            original: '',
            typed: typedLetter,
            status: 'extra',
          });
        } else if (letter.typed !== typedLetter) {
          state.characters++;
          letter.typed = typedLetter;
          if (letter.original !== typedLetter) {
            state.errors++;
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

      state.words[state.wordIndex] = {
        original: word.original,
        typed: trimmedValue,
        isCorrect: word.original === trimmedValue,
        letters,
      };

      if (!value) {
        if (state.wordIndex > 0) {
          const previousIndex = state.wordIndex - 1;
          const previousWord = state.words[previousIndex];
          state.words[previousIndex].letters.forEach((letter) => {
            if (!letter.typed) {
              letter.status = undefined;
            }
          });
          state.inputValue = ` ${previousWord.typed}`;
          state.wordIndex--;
        } else {
          state.inputValue = ' ';
        }
      } else if (value.endsWith(' ')) {
        state.inputValue = ' ';
        if (value.length > 2) {
          let isError = false;
          state.words[state.wordIndex].letters.forEach((letter) => {
            if (!letter.typed) {
              isError = true;
              letter.status = 'missed';
            }
          });
          if (isError) {
            state.errors++;
          }
          state.characters++;
          state.wordIndex++;
        }
      } else {
        state.inputValue = value;
      }
    },
    setTimer: (state, action: PayloadAction<number>) => {
      state.timer = action.payload;
      state.isRunning = true;
    },
    decrementTimer: (state) => {
      const { dataset } = state;
      const characters = state.characters - dataset.characters.reduce((a, b) => a + b, 0);
      let rawText = '';
      let wpmText = '';
      for (let i = 0; i < state.wordIndex; i++) {
        const word = state.words[i];
        if (word.isCorrect) {
          wpmText += ` ${word.typed}`;
        }
        rawText += ` ${word.typed}`;
      }
      rawText = rawText.trim();
      wpmText = wpmText.trim();
      const elapsedTime = ++state.elapsedTime;
      const raw = Math.round(characters / 5 / (1 / 60));
      const wpm = Math.round(wpmText.length / 5 / (elapsedTime / 60));
      const errors = state.errors - dataset.errors.reduce((a, b) => a + b, 0);
      state.timer--;
      state.raw = Math.round(rawText.length / 5 / (elapsedTime / 60));
      state.wpm = wpm;
      dataset.raw.push(raw);
      dataset.wpm.push(wpm);
      dataset.characters.push(characters);
      dataset.errors.push(errors);
      if (state.timer === 0) {
        state.isReady = false;
        state.isRunning = false;
        state.isTyping = false;
        state.isFinished = true;
      }
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
    resetTest: (state) => {
      const { rawWords } = state;
      Object.assign(state, initialState);
      state.rawWords = rawWords;
    },
  },
});

export const {
  setRawWords,
  setWords,
  checkInput,
  setTimer,
  decrementTimer,
  setIsReady,
  setIsTyping,
  setIsFinished,
  resetTest,
} = slice.actions;
export default slice.reducer;
