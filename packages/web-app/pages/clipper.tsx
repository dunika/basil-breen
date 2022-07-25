import type { NextPage } from 'next'
import Head from 'next/head'
import copy from 'copy-to-clipboard'

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
  useState,
} from 'react'
import {
  addSeconds,
  startOfDay,
  getSeconds,
  getMinutes,
  getHours,
} from 'date-fns'
import { uniqueId } from 'lodash'
import YouTube from 'react-youtube'
import { getPostMessages } from '../src/hashtags'
import { useLocalStorage } from '../src/hooks/useLocalStorage'
import { SnackbarStore } from '../src/Snackbar'

const getTimestamp = (seconds) => {
  const date = addSeconds(startOfDay(new Date()), seconds)

  const secondsText = getSeconds(date).toString().padStart(2, '0')

  const minutesText = getMinutes(date).toString()

  const hours = getHours(date)
  if (!hours) {
    return `${minutesText.padStart(1, '0')}:${secondsText}`
  }

  return `${hours}:${minutesText.padStart(2, '0')}:${secondsText}`
}

const formatTimestamps = (clips) => {
  return clips.reverse().map((clip) => {
    return `${getTimestamp(clip.start)} ${clip.caption}`
  }).join('\n')
}

const formatMessages = (clips, episode) => {
  return clips.reverse().map((clip) => {
    return getPostMessages(`${clip.caption}${episode ? ` | Ep.${episode} (link in bio)` : ''}`, {
      max: 11,
      locations: ['dublin', 'ireland', 'skerries'],
      postTypes: ['podcast'],
    }).tikTok
  }).join('\n\n')
}

let mockTime = 0
setInterval(() => {
  mockTime++
}, 1000)

const Clips = ({
  clips,
  setClips,
  setCurrentTime,
}) => {
  const updateClip = (index, update) => {
    setClips((draft) => {
      draft[index] = {
        ...draft[index],
        ...update,
      }
    })
  }
  const deleteClip = (index) => {
    setClips((draft) => {
      draft.splice(index, 1)
    })
  }

  const setTimestamp = (index, key, time, currentTimeIncrement = 0) => {
    setClips((draft) => {
      draft[index][key] = time
    })
    setCurrentTime(time + currentTimeIncrement)
  }

  return clips.map((clip, index) => {
    return (
      <Box
        display="flex"
        flexDirection="column"
        py={2}
        borderBottom="solid 1px black"
        key={clip.id}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <MaterialTextField
            value={clip.start}
            onChange={({ target: { value } }) => {
              return updateClip(index, {
                start: value,
              })
            }}
            label="Start"
            color="primary"
            sx={{
              width: 100,
            }}
          />
          <Box mx={1} display="flex" flexDirection="column">
            <button onClick={() => setTimestamp(index, 'start', clip.start + 1)}>
              ☝️
            </button>
            <div style={{ height: 8 }} />
            <button onClick={() => setTimestamp(index, 'start', clip.start - 1, -5)}>
              👇
            </button>
          </Box>
          <MaterialTextField
            value={clip.end}
            onChange={({ target: { value } }) => {
              return updateClip(index, {
                end: value,
              })
            }}
            label="End"
            color="primary"
            sx={{
              width: 100,
            }}
            inputProps={{
              type: 'number',
            }}
          />
          <Box mx={1} display="flex" flexDirection="column">
            <button onClick={() => setTimestamp(index, 'end', clip.end + 1)}>
              ☝️
            </button>
            <div style={{ height: 8 }} />
            <button onClick={() => setTimestamp(index, 'end', clip.end - 1, -5)}>
              👇
            </button>
          </Box>

          <Box mx={1} display="flex" flexDirection="column">
            <button onClick={() => setCurrentTime(clip.start)}>
              ▶️
            </button>
            <div style={{ height: 8 }} />
            <button onClick={() => deleteClip(index)}>
              X
            </button>
          </Box>
        </Box>
        <MaterialTextField
          value={clip.caption}
          onChange={({ target: { value } }) => {
            return updateClip(index, {
              caption: value,
            })
          }}
          label="Caption"
          color="primary"
        />
      </Box>
    )
  })
}

const Clipper: NextPage = () => {
  const [videoId, setVideoId] = useState('TX6LdnfctxM')
  const [clips, setClips] = useLocalStorage(videoId, [])
  const ref = useRef()

  if (typeof window !== 'undefined') {
    window.playerlad = ref.current.internalPlayer
  }

  const getCurrentTime = async () => {
    // return mockTime
    const time = await ref.current.internalPlayer.getCurrentTime()
    return Math.round(time)
    // ref.current.internalPlayer.playerInfo.currentTime // seconds
  }

  const setCurrentTime = (time) => {
    // mockTime = Math.max(0, time)
    ref.current.internalPlayer.seekTo(time)
    // ref.current.internalPlayer.playerInfo.currentTime // seconds
  }

  const addNewClip = async () => {
    const time = await getCurrentTime()
    setClips((draft) => {
      draft.unshift({
        start: time,
        end: null,
        caption: '',
        id: uniqueId(),
      })
    })
  }

  const addEnd = async () => {
    const time = await getCurrentTime()
    setClips((draft) => {
      draft[0].end = time
    })
  }
  const [episodeNumber, setEpisodeNumber] = useState<string>('')

  useEffect(() => {
    // debugger
    // console.log(
    //   ref.current.internalPlayer.playerInfo.currentTime // seconds
    // )

    const handler = (event) => {
      if (event.shiftKey) {
        addNewClip()
      }
      if (event.metaKey) {
        addEnd()
      }
    }

    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  })

  const { setMessage } = SnackbarStore.useContainer()

  return (
    <Container
      sx={{
        pt: 4,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Head>
        <title>Basil Breen | Video Clipper</title>
      </Head>
      <Box
        sx={{
          width: 720,
          height: 720,
        }}
      >
        {videoId && (
          <YouTube
            ref={ref}
            onError={console.error}
            videoId={videoId}
          />
        )}
      </Box>
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
        <Box display="flex">
          <Button
            onClick={() => {
              copy(formatTimestamps(clips))
              setMessage('Copied timestamps')
            }}
            sx={{ mr: 1 }}
            color="primary"
          >
            Timestamps
          </Button>
          <Button
            onClick={() => {
              copy(formatMessages(clips, episodeNumber))
              setMessage('Copied post messages')
            }}
            sx={{ mr: 1 }}
            color="primary"
          >
            Messages
          </Button>
          <Button
            onClick={() => {
              const cleaned = clips.map(({ id, ...rest }) => ({
                ...rest,
                episode: episodeNumber,
              })).reverse()
              copy(JSON.stringify(cleaned, null, 2))
              setMessage('Copied JSON for FFMPEG')
            }}
            sx={{ mr: 1 }}
            color="primary"
          >
            JSON
          </Button>
        </Box>
        {/* <span style={{ color: 'red' }}>{mockTime}</span> */}
        <Box sx={{
          display: 'flex',
          mt: 3,
          mb: 4,
          alignItems: 'center',
        }}
        >
          <MaterialTextField
            value={episodeNumber}
            onChange={({ target: { value } }) => setEpisodeNumber(value)}
            label="Episode"
            color="primary"
            sx={{
              width: 100,
              mr: 1,
            }}
            InputProps={{
              inputProps: {
                type: 'number',
              },
              startAdornment: <InputAdornment sx={{ color: 'primary.main' }} position="start">#</InputAdornment>,
            }}
          />
          <MaterialTextField
            value={videoId}
            onChange={({ target: { value } }) => setVideoId(value)}
            label="Video ID"
            color="primary"
            sx={{
              width: 200,
              mr: 2,
            }}
          />

        </Box>
        <Clips
          clips={clips}
          setClips={setClips}
          setCurrentTime={setCurrentTime}
        />
      </Paper>
    </Container>
  )
}

export default Clipper
