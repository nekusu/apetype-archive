import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  rawWords: string[];
  words: ApeTypes.Word[];
  wordIndex: number;
  inputValue: string;
  characters: number;
  errors: number;
  wpm: number;
  timer: number;
  elapsedTime: number;
  isRunning: boolean;
  isTyping: boolean;
}

const initialState: State = {
  rawWords: [],
  words: [],
  wordIndex: 0,
  inputValue: ' ',
  characters: 0,
  errors: 0,
  wpm: 0,
  timer: 0,
  elapsedTime: 0,
  isRunning: false,
  isTyping: false,
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
      const correctWords = state.words.filter((word) => word.isCorrect);
      const text = correctWords.map((word) => word.typed).join(' ');
      const wordCount = text.length / 5;
      state.wpm = Math.floor(wordCount / (++state.elapsedTime / 60));
      state.timer--;
      if (state.timer === 0) {
        state.isRunning = false;
      }
    },
    setIsTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload;
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
  setIsTyping,
  resetTest,
} = slice.actions;
export default slice.reducer;
