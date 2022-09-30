import { nanoid } from 'nanoid'
import ky from 'ky'

// Service for displaying notifications when selecting the title and description of the news
// eslint-disable-next-line
chrome.tabs.onActivated.addListener((info) => {
  // eslint-disable-next-line
  chrome.tabs.get(info.tabId, async function (tab) {
    if (tab?.url.split('/').length > 4) {
      //eslint-disable-next-line
      chrome.storage.local.set({ isFetching: true })
      const siteResponse = await ky
        .post('https://cyberguard-api.herokuapp.com/articles/parse', { json: { url: tab.url } })
        .json()
      const currentPageData = { newsData: { ...siteResponse, id: nanoid() } }
      //eslint-disable-next-line
      chrome.storage.local.set(currentPageData)
    }
  })
})
