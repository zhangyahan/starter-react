import { configureStore } from '@reduxjs/toolkit'
import loginUserSlice from './loginUserSlice'
import createReduxMiddlewareAlongState, { createReduxMiddlewareAlong } from '@/utils/ReduxMiddlewareAlong'

export default configureStore({
  reducer: {
    loginUser: loginUserSlice,
  },
  preloadedState: {
    ...createReduxMiddlewareAlongState(['loginUser']),
  },
  middleware: [createReduxMiddlewareAlong],
})
