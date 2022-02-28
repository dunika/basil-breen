import type { NextPage } from 'next'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import copy from 'copy-to-clipboard'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import {
  Apple,
  YouTube,
  Facebook,
  Instagram,
} from '@mui/icons-material'
import {
  Button,
} from '@mui/material'
import Head from 'next/head'
import {
  SnackbarStore,
  SnackbarProvider,
} from '../src/Snackbar'
import Link from '../src/Link'
import { blue } from '../src/theme'

const YouTubeVideo = ({ src }) => {
  return (
    <div className="youtube-container">
      <iframe
        src={src}
        frameBorder="0"
        allowFullScreen
      />

    </div>
  )
}

const originalMusic = [
  {
    img: <img
      width="18"
      height="18"
      src="https://cdn.cdnlogo.com/logos/s/89/spotify.svg"
    />,
    url: 'https://open.spotify.com/artist/33JlGzdySKstj1KN0BGACE?si=CUjZmtQ4TVW2B6zY9ZDG9Q',
    text: 'Spotify',
  },
  {
    img: <YouTube
      style={{
        color: '#FF0000',
        fontSize: 26,
      }}
    />,
    text: 'YouTube',
    url: 'https://www.youtube.com/channel/UCapU9dIhpBVnkEN3-ESAf0Q', // TODO
  },
  {
    img: <Apple
      style={{
        color: '#999999',
        fontSize: 26,
        paddingBottom: 3,
      }}
    />,
    text: 'Apple',
    url: 'https://music.apple.com/us/artist/basil-breen/1563295587',
  },
  {
    img: <img width="18" height="18" src="https://cdn.cdnlogo.com/logos/t/6/tiktok-app-icon.svg" />,
    url: 'https://www.tiktok.com/@basilbreen?lang=en',
    text: 'TikTok',
  },
  {
    img: <Instagram
      style={{
        color: '#833AB4',
        fontSize: 26,
      }}
    />,
    text: 'Instagram',
    url: 'https://www.instagram.com/basilbreen/', // TODO
  },
  {
    img: <Facebook
      style={{
        color: '#4267B2',
        fontSize: 26,
      }}
    />,
    text: 'Facebook',
    url: 'https://www.facebook.com/basilbreenlad',
  },
]

// const originalMusic = [
//   {
//     img: 'https://cdn.cdnlogo.com/logos/s/89/spotify.svg',
//     url: '',
//   },
//   {
//     img: 'https://cdn.cdnlogo.com/logos/y/57/youtube-icon.svg',
//     url: 'https://www.youtube.com/channel/UCapU9dIhpBVnkEN3-ESAf0Q', // TODO
//   },
//   {
//     img: 'https://cdn.cdnlogo.com/logos/a/77/apple.svg',
//     url: 'https://music.apple.com/us/artist/basil-breen/1563295587',
//   },
// ]

// https://www.youtube.com/playlist?list=PL8u6B-yLLbT5x4RsVpdCpaw-0koJ5BN43 pod

const Section = ({ items }) => {
  return (
    <List sx={{
      display: 'grid',
      gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(3, 1fr)'],
      gridColumnGap: 20,
      gridRowGap: 20,
      width: '512px',
      maxWidth: '100%',
    }}
    >
      {items.map(({ text, img: Img, url }) => {
        return (
          <Button
            key={url}
            href={url}
            startIcon={Img}
            size="large"
            target="_blank"
            variant="contained"
            color="secondary"
          >
            {text}
          </Button>
        )
      })}
    </List>
  )
}

const Home: NextPage = () => {
  const { setMessage } = SnackbarStore.useContainer()
  return (
    <Container maxWidth="lg" sx={{ px: 4 }}>
      <Head>
        <title>Basil Breen | Adventures in Music</title>
      </Head>
      <Box
        sx={{
          my: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h3"
          component="h1"
        >
          BASIL BREEN
        </Typography>
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 1,
          }}
        >
          <Link href="mailto:hello@basilbreen.com">
            HELLO@BASILBREEN.COM
          </Link>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              color: 'white',
            }}
            style={{
              padding: '4px 4px',
              minWidth: 0,
              marginLeft: 8,
            }}
            onClick={() => {
              copy('hello@basilbreen.com')
              setMessage('Copied email address')
            }}
          >
            <ContentCopyIcon color="primary" fontSize="small" />
          </Button>
        </Box>
        <Section items={originalMusic} />
        <Box
          sx={{
            mt: 2,
            width: '512px',
            py: 2,
          }}
        >
          <Typography gutterBottom variant="h4" component="h2">
            Original Music
          </Typography>
          <YouTubeVideo src="https://www.youtube.com/embed/vedeoseries?list=PL8u6B-yLLbT7UVf5-KeQBXNp0QEE_25yx" />
        </Box>
        <Box
          sx={{
            width: '512px',
            py: 2,
          }}
        >
          <Typography gutterBottom variant="h4" component="h2">
            Podcast
          </Typography>
          <YouTubeVideo src="https://www.youtube.com/embed/vedeoseries?list=PL8u6B-yLLbT5x4RsVpdCpaw-0koJ5BN43" />
        </Box>
        <Box
          sx={{
            width: '512px',
            py: 2,
          }}
        >
          <Typography gutterBottom variant="h4" component="h2">
            Covers
          </Typography>
          <YouTubeVideo src="https://www.youtube.com/embed/vedeoseries?list=PL8u6B-yLLbT6EkFDqHZuWeJ1SlhaezS0T" />
        </Box>
        <Box
          sx={{
            mt: 4,
            display: 'flex',
          }}
        >
          <Link href="https://github.com/dunika/basil-breen">Source Code</Link>
          &nbsp;
          <span>|</span>
          &nbsp;
          <Link href="./thumbnail-generator">Thumbnail Generator</Link>
        </Box>
      </Box>
    </Container>
  )
}

export default function Index(props) {
  return (
    <SnackbarProvider>
      <Home {...props} />
    </SnackbarProvider>
  )
}
