/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { validateUrl } from '@/util/validateUrl'

function Home() {
  const [longUrl, setLongUrl] = useState('')
  const [links, setLinks] = useState({})
  // console.log(longUrl)

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  async function onCreate(e) {
    e.preventDefault()

    if (!validateUrl(longUrl)) {
      alert('Please enter a valid URL')
      return
    }

    const result = await axios.post('/api/shorten', { longUrl })

    setLongUrl('')
    await refreshLinks()
  }

  async function getLinks() {
    const result = await axios.get('/api/links')
    // console.log(result.data.links)
    return result?.data?.links
  }

  async function refreshLinks() {
    const tmpLinks = await getLinks()
    // console.log(tmpLinks)
    setLinks(tmpLinks)
  }

  async function onShortUrlClick(shortUrl) {
    const url = `${baseURL}/go/${shortUrl}`;
    navigator.clipboard.writeText(url).then(
      () => {
        // Resolved - text copied to clipboard
        alert('Copied to clipboard!')
      },
      () => {
        // Rejected - clipboard write failed
        alert('Failed to copy to clipboard!')
      }
    )
  }

  const getEnv = () => {
    console.log(process.env.NEXT_PUBLIC_DB_TOKEN)
    console.log(process.env.NEXT_PUBLIC_DB_URL)
  }

  useEffect(() => {
    ;(async () => {
      await refreshLinks()
    })()
  }, [])

  return (
    <div className="grid grid-cols-1 gap-6 ">
      <h1>URL Shortener</h1>
      <div className="flex flex-col items-center justify-center gap-y-4">
        <h2>Create a short url</h2>
        <input
          className="border-2 border-black text-black rounded-lg h-10"
          type="text"
          placeholder="Enter log url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button
          onClick={onCreate}
          className="border border-indigo-500 bg-indigo-900 p-2 rounded-lg hover:bg-indigo-700"
        >
          Make it short
        </button>
        <button
          onClick={getEnv}
          className="border border-indigo-500 bg-indigo-900 p-2 rounded-lg hover:bg-indigo-700"
        >
          Get Env
        </button>
       
      </div>
      <div className="flex items-center justify-center overflow-x-auto shadow-md sm:rounded-lg">
        
        <table className="min-w-11 divide-y divide-gray-200">
          <thead className="bg-slate-800">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Short url
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Original url
              </th>
            </tr>
          </thead>
          <tbody className="bg-slate-600 divide-y divide-gray-200">
            {Object.keys(links).map((short) => {
              // console.log(short)
              const long = links[short]
        
              return (
                <tr key={short} className="hover:bg-gray-700 cursor-pointer">
                  <td
                    className="px-6 py-4 whitespace-nowrap"
                    onClick={() => onShortUrlClick(short)}
                  >
                    {`http://localhost:3000/go/${short}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{long}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
