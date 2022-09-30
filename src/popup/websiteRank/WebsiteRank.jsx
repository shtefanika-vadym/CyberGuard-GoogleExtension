import axios from 'axios'
import ky from 'ky'
import { nanoid } from 'nanoid'
import { Popover } from 'antd'
import { useEffect, useState } from 'react'

import rankIcon from '../../common/assets/rank-icon.svg'

import './websiteRank.css'

const rankData = [
  {
    id: nanoid(),
    name: 'Most reliable',
    rank: 5,
    color: '#198964',
    percentage: '90% - 100%',
  },
  {
    id: nanoid(),
    name: 'Very reliable',
    rank: 4,
    color: '#10B981',
    percentage: '80% - 90%',
  },
  {
    id: nanoid(),
    name: 'Reliable',
    rank: 3,
    color: '#FDCA01',
    percentage: '70% - 80%',
  },
  {
    id: nanoid(),
    name: 'Poor reliability',
    rank: 2,
    color: '#FF9F40',
    percentage: '50% - 70%',
  },
  {
    id: nanoid(),
    name: 'Untrusted',
    rank: 1,
    color: '#EF4444',
    percentage: '0% - 50%',
  },
]

export const WebsiteRank = () => {
  const [error, setError] = useState(null)
  const [ranking, setRanking] = useState(null)
  const [loading, setLoading] = useState(false)

  const getColorRank = () => {
    if (ranking) {
      const currentRank = rankData.find(
        (rank) => rank?.name?.toLowerCase() === ranking?.rankName?.toLowerCase(),
      )
      return currentRank.color
    }
    return 'initial'
  }

  useEffect(() => {
    const fetchRank = async () => {
      // eslint-disable-next-line no-undef
      chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
        let url = tabs[0].url
        if (url[url.length - 1] === '/') url = url.slice(0, -1) + ''
        const response = await axios({
          method: 'POST',
          baseURL: 'https://cyberguard-api.herokuapp.com',
          url: '/rankedSites/checkUrl',
          data: { url: url },
        })
        if (response?.data) setRanking(response.data)
        else {
          // eslint-disable-next-line no-undef
          chrome.tabs.sendMessage(
            tabs[0].id,
            { action: 'scrapeAllSites' },
            async function (response) {
              console.log(response)
              if (Array.isArray(response)) {
                const siteRating = await ky.post(
                  'https://cyberguard-api.herokuapp.com/parseRecentNews',
                  {
                    json: { news: response },
                  },
                )
                console.log(siteRating)
              }
            },
          )
        }
      })
    }
    fetchRank()
  }, [])

  const handleStartRankingCurrentPage = () => {
    setLoading(true)
    // eslint-disable-next-line
    chrome.tabs.query(
      {
        currentWindow: true,
        active: true,
      },
      async function (tabs) {
        const currentURL = tabs[0].url.split('/').slice(0, 3).join(' ').replace('  ', '//')
        const response = await axios({
          method: 'POST',
          baseURL: 'https://cyberguard-api.herokuapp.com',
          url: '/rankedSites/checkUrl',
          data: { url: currentURL },
        })
        if (response?.data === '') {
          setError(`To start the raking process, you must be on the main page of a ${currentURL}`)
          setTimeout(() => setError(null), 5000)
        } else setRanking(response?.data)
      },
    )
    setLoading(false)
  }

  if (!ranking) {
    return (
      <div>
        <h2 className='rank-title'>Website rank</h2>
        <button onClick={handleStartRankingCurrentPage} className='check-raking'>
          check site ranking {loading ? 'brere' : ''}
        </button>
        {error && <span className='rank-error'>{error}</span>}
      </div>
    )
  }
  console.log(ranking)
  return (
    <Popover
      content={
        <div className='rank-popover-content'>
          <div className='rank-popover-description'>
            <span className='rank-item-1'>NAME</span>
            <span className='rank-item-2'>RANK</span>
            <span className='rank-item-3'>SCORE</span>
          </div>
          <div className='rank-items-list'>
            {rankData.map((elRank) => (
              <div className='rank-items' key={elRank.id}>
                <span className='rank-item-1' style={{ color: elRank.color }}>
                  {elRank.name}
                </span>
                <span className='rank-item-2'>{elRank.rank}</span>
                <span className='rank-item-3'>{elRank.percentage}</span>
              </div>
            ))}
          </div>
        </div>
      }>
      <div className='rank'>
        <h2 className='rank-title'>Website rank</h2>
        <div className='rank-details'>
          <div className='rank-info'>
            <img src={rankIcon} alt='Rank Icon' />
            <span className='rank-reliable' style={{ color: getColorRank() }}>
              {ranking?.rankName}
            </span>
          </div>
          <span className='rank-status'>{ranking?.rankNumber}/5</span>
        </div>
      </div>
    </Popover>
  )
}
