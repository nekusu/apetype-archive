import { configureStore } from '@reduxjs/toolkit';
import typingTestReducer from '../components/TypingTest/TypingTest.slice';

const store = configureStore({
  reducer: {
    typingTest: typingTestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
