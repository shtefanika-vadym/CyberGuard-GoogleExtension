import { nanoid } from 'nanoid'
// Service for displaying notifications when selecting the title and description of the news
// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener(async function (request) {
  const notificationId = `my-back-notification-${nanoid()}`
  const getNotificationTitle = () => {
    if (request.type === 'title') return 'Title saved'
    return 'Content saved, AI analysis started'
  }
  // eslint-disable-next-line
  chrome.storage.local.get(['currentNotification'], (result) => {
    if (!!result?.currentNotification?.length)
      // eslint-disable-next-line
      chrome.notifications.clear(result?.currentNotification)
  })
  // eslint-disable-next-line no-undef
  chrome.notifications.create(notificationId, {
    type: 'basic',
    iconUrl: 'logo(128x128).png',
    title: getNotificationTitle(),
    message: request.message.substring(0, 150),
  })
  // eslint-disable-next-line no-undef
  chrome.storage.local.set({ currentNotification: notificationId })
})