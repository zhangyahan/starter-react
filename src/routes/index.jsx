import { useRoutes } from 'react-router-dom'
import HelloReact from '@/views/HelloReact/HelloReact'

export const useCreateRoutes = () => useRoutes([
  {
    path: '/',
    element: <HelloReact />,
  },
])
