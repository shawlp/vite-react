import React from 'react'
import ReactDOM from 'react-dom'
// import { initFontSize } from '@/utils/tool'
import App from './App'
import '@/styles/global.less'

// initFontSize()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
