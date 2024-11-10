import { configureStore } from '@reduxjs/toolkit';
import { chatApi } from './services/chatApi';
import { userApi } from '@/store/services/userApi.js';

export const store = configureStore({
  reducer: {
    [chatApi.reducerPath]: chatApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware).concat(userApi.middleware),
});
