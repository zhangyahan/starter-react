import { createSlice } from '@reduxjs/toolkit'
import type { AppState } from '.'

export interface LoginUserPermitState {
  id: number
  name: string
  value: string
}

export interface LoginUserState {
  permits: LoginUserPermitState[]
}

const loginUserSlice = createSlice({
  name: 'LoginUser',
  initialState: {
    value: {
      permits: [], // 登录用户的权限列表
    },
  },
  reducers: {
    setLoginUser(state, action) {
      state.value = action.payload
    },
    clearLoginUser(state, action) {
      state.value = action.payload || {}
    },
  },
})

// selector
export const selectLoginUserIsExists = (state: AppState) => Object.keys(state.loginUser.value).length > 0
export const selectLoginUserPermits = (state: AppState) => state.loginUser.value.permits || []

// dispatch actions
export const { setLoginUser, clearLoginUser } = loginUserSlice.actions

// export default reducer
export default loginUserSlice.reducer
