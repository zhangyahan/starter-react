import { createSlice } from '@reduxjs/toolkit'

const loginUserSlice = createSlice({
  name: 'LoginUser',
  initialState: {
    value: {},
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
export const selectLoginUserIsExists = state => Object.keys(state.loginUser.value).length > 0
export const selectLoginUserPermits = state => state.loginUser.value.permits || []

// dispatch actions
export const { setLoginUser, clearLoginUser } = loginUserSlice.actions

// export default reducer
export default loginUserSlice.reducer
