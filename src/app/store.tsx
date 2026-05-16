import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  createTransform,
  FLUSH,
  PAUSE,
  PERSIST,
  PersistConfig,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {imageListReducer} from "@entities/image/imageList";
import {imageProcessTimeListenerMiddleware} from "@entities/image/imageList/model/processTimeListener.ts";
import {IImageListState} from "@entities/image/imageList";

const rootReducer = combineReducers({
  image: imageListReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

const resetImageTransientState = (state: IImageListState): IImageListState => ({
  ...state,
  loading: false,
  error: null,
  previewLoading: false,
  previewError: null,
})

const imagePersistTransform = createTransform<IImageListState, IImageListState>(
  resetImageTransientState,
  resetImageTransientState,
  { whitelist: ['image'] },
)

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  whitelist: ['image'],
  transforms: [imagePersistTransform],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }).concat(imageProcessTimeListenerMiddleware.middleware),
})

export const persistor = persistStore(store)
export default store
