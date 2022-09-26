import { nanoid } from 'nanoid'
// Service for displaying notifications when selecting the title and description of the news
// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener(async function (request) {
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
