import React from 'react'
import { useSelector } from 'react-redux'
import type { LoginUserPermitState } from '@/store/loginUserSlice'
import { selectLoginUserIsExists, selectLoginUserPermits } from '@/store/loginUserSlice'

/**
 * 携带有权限的组件
 * @param {React.Component} Component
 * @param {Array<String>} permits
 * @returns
 */
export function requireAuthenticationComponent(Component: React.FunctionComponent, permits: string[]) {
  return function AuthenticatedComponent(props: any) {
    const loginUserIsExists = useSelector(selectLoginUserIsExists)
    if (loginUserIsExists)
      return null

    /**
     * @type {Array<{name, value, id}>}
     */
    const loginUserPermits = useSelector(selectLoginUserPermits)
    for (const permit of permits) {
      const index = loginUserPermits.findIndex((v: LoginUserPermitState) => v.value === permit)
      if (index <= -1)
        return null
    }

    return (
      <div>
        <Component {...props}></Component>
      </div>
    )
  }
}
