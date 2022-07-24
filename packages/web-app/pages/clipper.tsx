import type { NextPage } from 'next'
import Head from 'next/head'
import { useLocalStorage } from '../src/hooks/useLocalStorage'
import YouTube from 'react-youtube'
import { useHotkeys } from 'react-hotkeys-hook'
import {
  Container,
  TextField as MaterialTextField,
  Paper,
  InputAdornment,
  Button,
  Box,
} from '@mui/material'

import {
  useRef,
  useEffect,
  useCallback,
  useState,
} from 'react'
import {
  setFontSize,
  fillWrappedText,
  downloadImage,
  createImageFromCanvas,
} from '../src/canvas'
import { addSeconds, startOfDay, getSeconds, getMinutes, getHours } from 'date-fns'

const getTimestamp = (seconds) => {
  const date = addSeconds(startOfDay(new Date()), seconds)

  const secondsText = getSeconds(date).toString().padStart(2, '0')

  const minutesText = getMinutes(date).toString()

  const timestamp = `${minutesText}:${secondsText}`

  const hours = getHours(date)
  if (!hours) {
    return `${minutesText.padStart(1, '0')}:${secondsText}`
  }

  return `${hours}:${minutesText.padStart(2, '0')}:${secondsText}`

}


const Clipper: NextPage = () => {
  const [videoId, setVideoId] = useState('TX6LdnfctxM')
  const [clips, setClips] = useLocalStorage(videoId, {})
  const ref = useRef()
  if (typeof window !== 'undefined') {
    window.getTimestamp = getTimestamp
  }

  useHotkeys('ctrl+a', () => {
    console.log(
      ref.current.internalPlayer.playerInfo.currentTime // seconds
    )
  })


  return (
    <Container
      sx={{
        pt: 4,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Head>
        <title>Basil Breen | Thumbnail Generator</title>
      </Head>
      <Paper
        sx={{
          mr: 2,
          px: 4,
          py: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <MaterialTextField
          value={videoId}
          onChange={({ target: { value } }) => setVideoId(value)}
          label="Video ID"
          color="primary"
          sx={{
            width: 200,
            mb: 4,
          }}

        />
        <Box sx={{ display: 'flex' }}>
          <Button color="primary" >
            Download
          </Button>
        </Box>
      </Paper>
      <Box
        sx={{
          width: 256,
          height: 256,
        }}
      >
        {videoId && <YouTube
          opt={{
            host: 'https://www.youtube.com',
            playerVars: {
              origin: 'http://localhost:3000',


              // rel?: 0 | 1;
            }
          }}
          onError={console.error}
          videoId={videoId}
        />}
      </Box>
    </Container>
  )
}


export default Clipper
