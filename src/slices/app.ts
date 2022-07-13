import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DefaultTheme } from 'styled-components';
import defaultTheme from '../themes/dark';

interface State {
  theme: Omit<DefaultTheme, 'fontFamily'>;
  commandLine: {
    isOpen: boolean;
    initial: string;
  };
}

const savedTheme = localStorage.getItem('theme');
const theme: DefaultTheme = savedTheme
  ? JSON.parse(savedTheme)
  : defaultTheme;

const initialState: State = {
  theme,
  commandLine: {
    isOpen: false,
    initial: '',
  },
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<DefaultTheme>) => {
      state.theme = action.payload;
    },
    setCommandLine: (state, action: PayloadAction<{ isOpen: boolean, initial?: string; }>) => {
      const { isOpen, initial } = action.payload;
      state.commandLine = {
        isOpen,
        initial: initial || '',
      };
    },
  },
});

export const {
  setTheme,
  setCommandLine,
} = slice.actions;
export default slice.reducer;
