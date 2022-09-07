import moment from 'moment'
import 'moment/locale/zh-cn'
import 'normalize.css'
import 'antd/dist/antd.css'
import './styles/index.css'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App'
import store from './store'

moment.locale('zh-cn')

const root = document.getElementById('root')
createRoot(root!)
  .render(
    <Provider store={store}>
      <React.StrictMode>
        <HashRouter>
          <App/>
        </HashRouter>
      </React.StrictMode>
    </Provider>,
  )
