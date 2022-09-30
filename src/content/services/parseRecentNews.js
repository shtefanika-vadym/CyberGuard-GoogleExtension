const parseAll = async () => {
  const arrayLinksData = []
  const mapLinks = new Map()
  const arrayLinksItems = document.links
  for (let i = 0; i < arrayLinksItems.length; i++)
    !arrayLinksData.includes(arrayLinksItems[i].href) &&
      arrayLinksData.push(arrayLinksItems[i].href)
  for (let i = 0; i < arrayLinksData.length; i++) {
    const baseLink = arrayLinksData[i].split('/')[2]
    if (mapLinks.has(baseLink)) mapLinks.set(baseLink, mapLinks.get(baseLink) + 1)
    else mapLinks.set(baseLink, 1)
  }

  const [mostCommon] = mapLinks.keys()
  const filteredLinks = arrayLinksData
    .sort((a, b) => b.length - a.length)
    .filter((link) => link.includes(mostCommon) && !link.includes('video'))
    .slice(0, 20)
  return filteredLinks
}

const parseCurrent = () => {
  const result = {
    title: '',
    content: '',
  }
  const newsTitle = document.querySelector('h1').innerText
  if (newsTitle) result.title = newsTitle
  const pageElements = document.getElementsByTagName('DIV')
  for (let i = 0; i < pageElements.length; i++) {
    if (pageElements[i].classList.value.includes('article')) {
      const contentNews = pageElements[i].textContent?.replace(/\s{2,}/g, ' ').trim()
      if (result.content.length < contentNews.length) result.content = contentNews
    }
  }
  return result
}

export const ParseRecentNews = {
  parseAll,
  parseCurrent,
}
