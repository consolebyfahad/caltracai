import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from "redux-persist";

import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import themeReducer from "./slices/themeSlice";
import uiReducer from "./slices/uiSlice";

const themePersistConfig = {
  key: "theme",
  storage: AsyncStorage,
};

const uiPersistConfig = {
  key: "ui",
  storage: AsyncStorage,
};

/** Restores session on cold start so routing does not wait on Firebase + Firestore. */
const authPersistConfig = {
  key: "auth",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  profile: profileReducer,
  theme: persistReducer(themePersistConfig, themeReducer),
  ui: persistReducer(uiPersistConfig, uiReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
