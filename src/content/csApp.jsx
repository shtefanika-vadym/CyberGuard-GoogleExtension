const CSApp = () => {
  const saveInLocalStorage = (saveData, sendData) => {
    // eslint-disable-next-line
    chrome.storage.local.set(saveData)
    // eslint-disable-next-line
    chrome.runtime.sendMessage(sendData)
  }

  const getStorageSync = (storageKey) =>
    new Promise((resolve, reject) => {
      // eslint-disable-next-line
      chrome.storage.local.get([storageKey], (result) => {
        // eslint-disable-next-line
        if (chrome.runtime.lastError) return reject(chrome.runtime.lastError)
        resolve(result)
      })
    })

  const processDescriptionNode = (node) => {
    const childNodes  = node.childNodes()
    console.log(childNodes)
    for (let i = 0; i < childNodes.length; i++) {
      const childNode = childNodes[i]
      console.log(childNode)
    }
  }

  document.addEventListener(
    'click',
    async function (e) {
      e = e || window.event
      let targetElement = e.target
      let text = targetElement.textContent
      text = text.trim()

      let currentStep = -1

      const storageResult = await getStorageSync('analysisSteps')
      const storageContent = await getStorageSync('content')

      if (storageResult?.analysisSteps)
        currentStep = storageResult?.analysisSteps.filter((step) => step.completed).length

      switch (true) {
        case currentStep === 1 &&
          (targetElement?.tagName === 'H1' || targetElement?.tagName === 'H2'):
          saveInLocalStorage({ title: text }, { type: 'title', message: text })
          break
        case !storageContent?.content &&
          currentStep === 2 &&
          (targetElement.tagName === 'ARTICLE' || targetElement.classList.value.includes('artic')):
          const adjustedChildContent = text.replace(/\s{2,}/g, ' ').trim()
          saveInLocalStorage(
            { content: adjustedChildContent },
            { type: 'content', message: adjustedChildContent },
          )
         processDescriptionNode(targetElement)
          break
        case !storageContent?.content &&
          currentStep === 2 &&
          (targetElement.parentElement.tagName === 'ARTICLE' ||
            targetElement.parentElement.classList.value.includes('artic')):
          const adjustedParentContent = targetElement.parentElement.textContent
            .replace(/\s{2,}/g, ' ')
            .trim()
          saveInLocalStorage(
            { content: adjustedParentContent },
            { type: 'content', message: adjustedParentContent },
          )
          processDescriptionNode(targetElement.parentElement)
          break
        default:
          break
      }
    },
    false,
  )

  return <div className='app-container'>Injectable container</div>
}

export default CSApp
