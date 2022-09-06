import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectLoginUserIsExists, selectLoginUserPermits } from '@/store/loginUserSlice'

/**
 * 携带有权限的路由
 * @param {React.Component} Component
 * @param {Array<String>} permits
 * @returns
 */
export function requireAuthenticationRoute(Component, permits) {
  return function AuthenticatedRoute() {
    const location = useLocation()
    const navigate = useNavigate()
    /**
     * @type {Array<{name, value, id}>}
     */
    const loginUserPermits = useSelector(selectLoginUserPermits)
    const loginUserIsExists = useSelector(selectLoginUserIsExists)

    useEffect(() => {
      if (!loginUserIsExists) {
        navigate('/login', { state: { prev: '/forbidden' } })
        return
      }

      for (const permit of permits) {
        const index = loginUserPermits.findIndex(v => v.value === permit)
        if (index <= -1) {
          navigate(location.state.prev, { state: { prev: '/forbidden' } })
          return
        }
      }
    }, [loginUserPermits, loginUserIsExists])

    return <Component />
  }
}
