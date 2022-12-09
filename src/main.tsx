import moment from 'moment'
import 'moment/locale/zh-cn'
import 'normalize.css'
import 'antd/dist/antd.css'
import './styles/index.css'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import App from './App'

moment.locale('zh-cn')

const root = document.getElementById('root')
createRoot(root!)
  .render(
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>,
  )
