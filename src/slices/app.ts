import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DefaultTheme } from 'styled-components';
import defaultColors from '../themes/aurora';

interface State {
  theme: DefaultTheme;
  commandLine: {
    isOpen: boolean;
    initial: string;
  };
}

const initialState: State = {
  theme: defaultColors,
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
