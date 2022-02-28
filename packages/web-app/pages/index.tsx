import type { NextPage } from 'next'
import Image from 'next/image'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import copy from 'copy-to-clipboard'
import EmailIcon from '@mui/icons-material/AlternateEmail'
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
import { ReactElement } from 'react'
import {
  SnackbarStore,
  SnackbarProvider,
} from '../src/Snackbar'
import Link from '../src/Link'

const YouTubeVideo = ({ src }: { src: string}) => {
  return (
    <div className="youtube-container">
      <iframe
        title="YouTube"
        src={src}
        frameBorder="0"
        allowFullScreen
      />

    </div>
  )
}

const originalMusic = [
  {
    img: <Image
      alt="Spotify"
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
    img: <Image
      alt="TikTok"
      width="18"
      height="18"
      src="https://cdn.cdnlogo.com/logos/t/6/tiktok-app-icon.svg"
    />,
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

type SocialItem = {
  url: string,
  img: ReactElement,
  text: string
}

type SectionProps = {
  items: SocialItem[]
}

const Section = (props: SectionProps) => {
  const { items } = props
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
      {items.map((item) => {
        const { text, img: Img, url } = item
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
          <Button
            onClick={() => {
              copy('hello@basilbreen.com')
              setMessage('Copied email address')
            }}
            startIcon={<EmailIcon color="secondary" fontSize="small" />}
          >
            Email
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

const HomeProvider: NextPage = (props) => {
  return (
    <SnackbarProvider>
      <Home {...props} />
    </SnackbarProvider>
  )
}

export default HomeProvider
