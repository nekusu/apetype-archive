import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  rawWords: string[];
  words: ApeTypes.Word[];
  isRunning: boolean;
  isTyping: boolean;
}

interface UpdateParams {
  wordIndex: number;
  typed: string[];
}

const slice = createSlice({
  name: 'typingTest',
  initialState: {
    rawWords: [],
    words: [],
    isRunning: false,
    isTyping: false,
  } as State,
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
    updateWord: (state, action: PayloadAction<UpdateParams>) => {
      const { wordIndex: index, typed } = action.payload;
      const word = state.words[index];
      const typedWord = typed.join('');
      let letters = [...word.letters];
      [...word.original].forEach((_, i) => {
        letters[i].typed = typed[i];
        if (!typed[i]) {
          letters[i].status = 'missed';
        } else if (typed[i] !== letters[i].original) {
          letters[i].status = 'incorrect';
        } else {
          letters[i].status = 'correct';
        }
      });
      letters = letters.filter((letter) => letter.status !== 'extra');
      if (typed.length > word.original.length) {
        const extraLetters = typed.slice(word.original.length).map((letter) => ({
          original: '',
          typed: letter,
          status: 'extra',
        }) as ApeTypes.Letter);
        letters.push(...extraLetters);
      }
      state.words[index] = {
        original: word.original,
        typed: typedWord,
        isCorrect: word.original === typedWord,
        letters,
      };
    },
    setIsRunning: (state, action: PayloadAction<boolean>) => {
      state.isRunning = action.payload;
    },
    setIsTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload;
    },
    restartState: (state) => {
      state.words = [];
      state.isRunning = false;
      state.isTyping = false;
    },
  },
});

export const {
  setRawWords,
  setWords,
  updateWord,
  setIsRunning,
  setIsTyping,
  restartState,
} = slice.actions;
export default slice.reducer;
