import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { shazamAPI } from './services/shazamCore';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    [shazamAPI.reducerPath]:shazamAPI.reducer 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamAPI.middleware)
});
