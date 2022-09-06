import { useRoutes } from 'react-router-dom'
import Index from '@/views/Index/Index'

export const useCreateRoutes = () => useRoutes([
  {
    path: '/',
    element: <Index />,
  },
])
