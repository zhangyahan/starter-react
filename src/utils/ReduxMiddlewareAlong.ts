/**
 * 持久化存储 redux 中的状态, 保存在LocalSession或者LocalStorage中.
 */

import { merge } from 'lodash-es'
import type { Middleware } from '@reduxjs/toolkit'
import type { AppState, AppStateKey } from '@/store'

const STORAGE_KEY = 'redux-along'
const ROOT_KEY = 'root'

let StroageKeys: AppStateKey[] = []

export const createReduxMiddlewareAlong: Middleware = ({ getState }: { getState: () => AppState }) => {
  return next => (action) => {
    const returnValue = next(action)

    const currentState: AppState = getState()
    const storage = localStorage.getItem(STORAGE_KEY)
    const storageParseValue = JSON.parse(storage!)
    const oldRoot = storageParseValue[ROOT_KEY]
    const newRoot: Record<string, any> = {}
    StroageKeys.forEach((key: AppStateKey) => {
      const value = currentState[key]
      if (value)
        newRoot[key] = value
    })
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ [ROOT_KEY]: merge(newRoot, oldRoot) }))
    return returnValue
  }
}

/**
 * 将传入对象的 key 进行存储. 并进行数据的预先加载
 *
 * @param {Array<string>} storeKeys 要进行存储的key
 */
export default function createReduxMiddlewareAlongState(storeKeys: AppStateKey[]) {
  StroageKeys = storeKeys
  const returnState: Record<string, any> = {}

  try {
    const storage = localStorage.getItem(STORAGE_KEY)
    const storageParseValue = JSON.parse(storage!)
    const root: Record<string, any> = storageParseValue[ROOT_KEY]
    storeKeys.forEach((key: string) => {
      const value: any = root[key]
      if (value)
        returnState[key] = value
    })
  }
  catch (ignore) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ [ROOT_KEY]: {} }))
  }

  return returnState
}
