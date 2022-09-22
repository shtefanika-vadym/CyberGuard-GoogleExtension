import { useEffect } from 'react'

const CSApp = () => {
  useEffect(() => {
    document.addEventListener(
      'click',
      function (e) {
        e = e || window.event
        let targetElement = e.target || e.srcElement,
          text = targetElement.textContent || targetElement.innerText
        targetElement.classList.add('targetElement')

        if (targetElement.tagName === 'H1') {
          targetElement.classList.add('targetElement')
          // eslint-disable-next-line no-undef

          // eslint-disable-next-line no-undef
          chrome.storage.local.set({ key: text })
        }

        if (targetElement.tagName === 'SPAN' || targetElement.tagName === 'P') {
          targetElement.parentNode.classList.add('targetElement')
          targetElement.classList.remove('targetElement')
        }
      },
      false,
    )
  })

  return <div className='app-container'>Injectable container</div>
}

export default CSApp
