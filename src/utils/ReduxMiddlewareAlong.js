/**
 * 持久化存储 redux 中的状态, 保存在LocalSession或者LocalStorage中.
 */

import { merge } from 'lodash-es'

const STORAGE_KEY = 'redux-along'
const ROOT_KEY = 'root'
let StroageKeys = []

export function createReduxMiddlewareAlong({ getState }) {
  return next => (action) => {
    const returnValue = next(action)
    console.log('ReduxMiddlewareAlong', getState())
    const currentState = getState()
    const storage = localStorage.getItem(STORAGE_KEY)
    const storageParseValue = JSON.parse(storage)
    const oldRoot = storageParseValue[ROOT_KEY]
    const newRoot = {}
    StroageKeys.forEach((key) => {
      const value = currentState[key]
      if (value)
        newRoot[key] = value
    })
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ [ROOT_KEY]: merge(newRoot, oldRoot) }))
    return returnValue
  }
}

/**
 * 将传入对象的 key 进行存储.
 * @param {Array<string>} storeKeys 要进行存储的key
 */
export default function createReduxMiddlewareAlongState(storeKeys) {
  StroageKeys = storeKeys
  const returnState = {}
  const storage = localStorage.getItem(STORAGE_KEY)
  try {
    const storageParseValue = JSON.parse(storage)
    const root = storageParseValue[ROOT_KEY]
    storeKeys.forEach((key) => {
      const value = root[key]
      if (value)
        returnState[key] = value
    })
  }
  catch (ignore) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ [ROOT_KEY]: {} }))
  }

  return returnState
}
