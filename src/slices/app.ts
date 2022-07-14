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

const initialState: State = {
  theme: defaultTheme,
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
