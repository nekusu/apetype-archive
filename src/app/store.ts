import { configureStore } from '@reduxjs/toolkit';
import configReducer from './config.slice';
import typingTestReducer from '../components/TypingTest/TypingTest.slice';

const store = configureStore({
  reducer: {
    config: configReducer,
    typingTest: typingTestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
