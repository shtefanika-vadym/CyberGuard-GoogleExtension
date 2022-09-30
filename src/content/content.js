import React from 'react'
import CSApp from './csApp'
import ReactDOM from 'react-dom/client'
import '../common/styles/common.css'

import { ParseRecentNews } from '../content/services/parseRecentNews'

const ContentScriptInsertionPoint = document.createElement('div')
ContentScriptInsertionPoint.id = 'contentScriptInsertionPoint'

if (window.location.pathname.split('/').length <= 2) {
  ParseRecentNews.parseAll().then((response) => {
    // eslint-disable-next-line no-undef
    chrome.runtime.sendMessage({scrapeRating: response});
  })
}

// Add the entry point to dom
document.body.insertBefore(ContentScriptInsertionPoint, document.body.firstElementChild)

const root = ReactDOM.createRoot(ContentScriptInsertionPoint)

root.render(<CSApp />)

// eslint-disable-next-line
chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  if (request?.action === 'scrapeAllSites') {
    const result = await ParseRecentNews.parseAll()
    sendResponse(result)
  }
})
