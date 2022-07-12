import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DefaultTheme } from 'styled-components';
import defaultColors from '../themes/aurora';

interface State {
  theme: DefaultTheme;
}

const initialState: State = {
  theme: defaultColors,
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<DefaultTheme>) => {
      state.theme = action.payload;
    },
  },
});

export const {
  setTheme,
} = slice.actions;
export default slice.reducer;
