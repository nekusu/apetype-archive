import { configureStore } from '@reduxjs/toolkit';
import typingTestReducer from '../components/TypingTest/TypingTest.slice';
import testStatsReducer from '../components/TestStats/TestStats.slice';

const store = configureStore({
  reducer: {
    typingTest: typingTestReducer,
    testStats: testStatsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
