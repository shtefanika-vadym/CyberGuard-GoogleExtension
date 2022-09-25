import { nanoid } from 'nanoid'

// Service for displaying notifications when selecting the title and description of the news
// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener(async function (request) {
  // eslint-disable-next-line
  // async function getCurrentTab() {
  //   let queryOptions = { active: true, lastFocusedWindow: true }
  //   // `tab` will either be a `tabs.Tab` instance or `undefined`.
  //   // eslint-disable-next-line
  //   let [tab] = await chrome.tabs.query(queryOptions)
  //   return tab
  // }
  // await getCurrentTab()
  if (request.type === 'content') {
  }
  const getNotificationTitle = () => {
    if (request.type === 'title') return 'Title saved'
    return 'Description saved, AI analysis started'
  }

  // eslint-disable-next-line no-undef
  chrome.notifications.create(`my-back-notification-${nanoid()}`, {
    type: 'basic',
    iconUrl: 'logo(128x128).png',
    title: getNotificationTitle(),
    message: request.message.substring(0, 150),
  })
})

// async function getCurrentTab() {
//   let queryOptions = { active: true, currentWindow: true }
//   // eslint-disable-next-line no-undef
//   let [tab] = await chrome.tabs.query(queryOptions)
//   return tab
// }
// // eslint-disable-next-line no-undef
// chrome.runtime.onInstalled.addListener(async () => {
//   console.log(await getCurrentTab());
// })
// // eslint-disable-next-line no-undef
// chrome.action.onClicked.addListener((some) => {
//   console.log(some)
// });

// // eslint-disable-next-line no-undef
// chrome.tabs.onActivated.addListener((activeInfo) => {
//   console.log('onActivated')
//   sendCurrentUrl()
// })
//
// // eslint-disable-next-line no-undef
// chrome.tabs.onSelectionChanged.addListener(() => {
//   console.log('onSelectionChanged')
//   sendCurrentUrl()
// })
//
// function sendCurrentUrl() {
//   // eslint-disable-next-line no-undef
//   chrome.tabs.query(null, function (tab) {
//     var tablink = tab.url
//     console.log(tablink)
//   })
// }
