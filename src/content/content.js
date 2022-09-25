import React from 'react'
import CSApp from './csApp'
import ReactDOM from 'react-dom/client'
import '../common/styles/common.css'

// Create Entry Point For React App
const ContentScriptInsertionPoint = document.createElement('div')
ContentScriptInsertionPoint.id = 'contentScriptInsertionPoint'

// Add the entry point to dom
document.body.insertBefore(ContentScriptInsertionPoint, document.body.firstElementChild)

const root = ReactDOM.createRoot(ContentScriptInsertionPoint)

root.render(<CSApp />)