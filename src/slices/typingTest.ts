import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  testLanguage: {
    name: string;
    words: string[];
  },
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
  isTestPopupOpen: boolean;
}

const initialState: State = {
  testLanguage: {
    name: '',
    words: [],
  },
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
  isTestPopupOpen: false,
};

const slice = createSlice({
  name: 'typingTest',
  initialState,
  reducers: {
    setTestLanguage: (state, action: PayloadAction<{ name: string, words: string[]; }>) => {
      const { name, words } = action.payload;
      if (name !== state.testLanguage.name) {
        state.testLanguage = { name, words };
      }
    },
    addTestWords: (state, action: PayloadAction<string[]>) => {
      const testWords = action.payload.map((word) => ({
        original: word,
        isCorrect: false,
        letters: [...word].map((letter) => ({ original: letter })),
      }));
      state.testWords.push(...testWords);
      state.isReady = true;
    },
    checkInput: (state, action: PayloadAction<{ value: string, config: ApeTypes.Config; }>) => {
      const { value, config } = action.payload;
      const { mode, words, freedomMode, confidenceMode, quickEnd } = config;
      const trimmedValue = value.trim();
      const typedLetters = [...trimmedValue];
      const emptyWord = {
        original: '',
        isCorrect: true,
        letters: [],
      };
      let word = state.testWords[state.wordIndex];
      if (!word) {
        state.testWords.push(emptyWord);
        word = state.testWords[state.wordIndex];
      }
      const letters = [...word.letters];

      typedLetters.forEach((typedLetter, index) => {
        const letter = letters[index];
        if (!letter) {
          state.characterCount++;
          if (mode !== 'zen') {
            state.errorCount++;
          }
          letters.push({
            original: typedLetter,
            typed: typedLetter,
            status: mode === 'zen' ? 'correct' : 'extra',
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

      [...letters].forEach((_, index) => {
        const typedLetter = typedLetters[index];
        const letter = letters[index];
        if (typedLetter) return;
        if (mode === 'zen' || letter.status === 'extra') {
          letters.pop();
        } else if (confidenceMode !== 'max') {
          letter.typed = '';
          letter.status = undefined;
        }
      });

      state.testWords[state.wordIndex] = {
        original: word.original,
        typed: trimmedValue,
        isCorrect: mode === 'zen' || word.original === trimmedValue,
        letters,
      };

      if (mode === 'words' && quickEnd === 'on' && state.wordIndex === words - 1 &&
        trimmedValue.length === word.original.length) {
        state.wordIndex++;
      }

      if (!value) {
        state.inputValue = ' ';
        if (state.wordIndex > 0) {
          if (!letters.length) {
            state.testWords.splice(-1, 1);
          }
          const previousIndex = state.wordIndex - 1;
          const previousWord = state.testWords[previousIndex];
          previousWord.letters.forEach((letter) => {
            if (!letter.typed) {
              letter.status = undefined;
            }
          });
          if (freedomMode === 'on' || confidenceMode === 'off' && !previousWord.isCorrect) {
            state.inputValue += previousWord.typed;
            state.wordIndex--;
          }
        }
      } else if (value.length > 1 && value.endsWith(' ')) {
        state.inputValue = ' ';
        if (value.length > 2) {
          const nextWord = state.testWords[state.wordIndex + 1];
          if (mode === 'zen' && !nextWord) {
            state.testWords.push(emptyWord);
          }
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
          if (mode === 'zen' || nextWord) {
            state.characterCount++;
          }
          state.wordIndex++;
        }
      } else if (confidenceMode !== 'max' || value.length >= state.inputValue.length) {
        state.inputValue = value;
      }
    },
    updateStats: (state, action: PayloadAction<number>) => {
      const timestamp = action.payload;
      const { stats } = state;
      let rawText = '';
      let wpmText = '';
      for (let i = 0; i <= state.wordIndex; i++) {
        const word = state.testWords[i];
        if (!word) continue;
        if (word.isCorrect) {
          wpmText += ` ${word.typed || ''}`;
        }
        rawText += ` ${word.typed || ''}`;
      }
      wpmText = wpmText.trim();
      rawText = rawText.trim();
      const elapsedTime = +((timestamp - state.startTime) / 1000).toFixed(2);
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
    startTest: (state, action: PayloadAction<number>) => {
      const timestamp = action.payload;
      state.startTime = +timestamp.toFixed(2);
      state.isRunning = true;
    },
    endTest: (state) => {
      state.isReady = false;
      state.isRunning = false;
      state.isTyping = false;
      state.isFinished = true;
    },
    resetTest: (state) => {
      const { testLanguage } = state;
      Object.assign(state, initialState);
      state.testLanguage = testLanguage;
    },
    setIsTestPopupOpen: (state, action: PayloadAction<boolean>) => {
      state.isTestPopupOpen = action.payload;
    },
  },
});

export const {
  setTestLanguage,
  addTestWords,
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
  setIsTestPopupOpen,
} = slice.actions;
export default slice.reducer;
