/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { validateUrl } from '@/util/validateUrl'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function ShortenUrl() {
  const [longUrl, setLongUrl] = useState('')
  const [link, setLink] = useState([])

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  async function onCreate(e) {
    e.preventDefault()

    if (!validateUrl(longUrl)) {
      toast.error('Please enter a valid URL')
      return
    }
    try {
      const result = await axios.post('/api/shorten', { longUrl })
      // console.log(result.data.shortUrl)
      toast.success('Link created successfully')
      setLink(result.data)

      setLongUrl('')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  async function onShortUrlClick(shortUrl) {
    const url = `${baseURL}/go/${shortUrl}`
    navigator.clipboard.writeText(url).then(
      () => {
        // Resolved - text copied to clipboard
        toast('Copied to clipboard!')
      },
      () => {
        // Rejected - clipboard write failed
        toast('Failed to copy to clipboard!')
      }
    )
  }

  // Notify
  const notify = () => {
    toast('Wow so easy !')
    console.log(link.shortUrl)
    console.log(process.env.NODE_ENV)
    console.log(fullURL)
  }

  async function createCopyUrl(link) {
    const url = `${baseURL}/go/${link}`
    navigator.clipboard.writeText(url).then(
      () => {
        // Resolved - text copied to clipboard
        toast('Copied to clipboard!')
      },
      () => {
        // Rejected - clipboard write failed
        toast('Failed to copy to clipboard!')
      }
    )
  }

  const fullURL = process.env.NEXT_PUBLIC_HOSTNAME || (typeof window !== 'undefined' ? window.location.hostname + (window.location.port ? ':' + window.location.port : '') : '');


  return (
    <div className="bg-gray-50/90 w-full min-h-svh py-12">
      <div className="container grid gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Shorten your links
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Enter a long URL to make it short and sweet.
          </p>
        </div>

        <div className="mx-auto max-w-sm space-y-2 ">
          <div className="flex gap-x-1">
            <Input
              className="w-full rounded-none rounded-l-lg"
              placeholder="Enter a URL"
              type="text"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
            />
            <Button variant="default" onClick={onCreate}>
              Shorten
            </Button>
          </div>
          <Button onClick={notify} variant="">
            Show toast
          </Button>
        </div>

        <div className="mx-auto max-w-md space-y-4">
          <div className="divide-y">
            {link?.shortUrl ? (
              <div>
                <h3 className="text-gray-500 text-xl font-medium">Your new link is: </h3>
                <div className="flex gap-x-1">
                  <Input type="text" value={`${fullURL}/go/${link.shortUrl}`} />
                  <Button
                    variant="default"
                    onClick={() => createCopyUrl(link.shortUrl)}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold tracking-tighter sm:text-xl md:text-2xl">
                  Example
                </h3>
                <div className="flex flex-col py-2">
                  <p className="text-sm font-medium">Original URL</p>
                  <p className="text-sm">https://example.com/very/long/url</p>
                </div>
                <div className="flex flex-col py-2">
                  <p className="text-sm font-medium">Shortened URL</p>
                  <p className="text-sm">linkcuty.vercel.app/go/1RM3</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
