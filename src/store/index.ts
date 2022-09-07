import { configureStore } from '@reduxjs/toolkit'

import loginUserSlice from './loginUserSlice'
import createReduxMiddlewareAlongState, { createReduxMiddlewareAlong } from '@/utils/ReduxMiddlewareAlong'

const store = configureStore({
  reducer: {
    loginUser: loginUserSlice,
  },
  preloadedState: {
    ...createReduxMiddlewareAlongState(['loginUser']),
  },
  middleware: [createReduxMiddlewareAlong],
})

export type AppState = ReturnType<typeof store.getState>
export type AppStateKey = 'loginUser'

export type AppDispatch = typeof store.dispatch

export default store
