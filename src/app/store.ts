import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../slices/app';
import configReducer from '../slices/config';
import typingTestReducer from '../slices/typingTest';

const store = configureStore({
  reducer: {
    app: appReducer,
    config: configReducer,
    typingTest: typingTestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
