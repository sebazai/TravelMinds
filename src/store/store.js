import { configureStore } from '@reduxjs/toolkit';

import { placesApi } from './services/placesApi';
import { userApi } from '@/store/services/userApi.js';

export const store = configureStore({
  reducer: {
    [placesApi.reducerPath]: placesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(placesApi.middleware).concat(userApi.middleware),
});
