import React from 'react'
import ReactDOM from 'react-dom/client'
import PopupApp from './popupApp'
import { Provider } from 'react-redux'

import store from '../store/store'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <Provider store={store}>
    <PopupApp />
  </Provider>,
)
