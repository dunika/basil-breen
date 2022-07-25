import type { NextPage } from 'next'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import copy from 'copy-to-clipboard'
import EmailIcon from '@mui/icons-material/AlternateEmail'
import {
  Button,
} from '@mui/material'
import Head from 'next/head'
import { ReactElement } from 'react'
import {
  SnackbarStore,
} from '../src/Snackbar'
import Link from '../src/Link'
import { socials } from '../src/socials'
import { Harp } from '../src/harp'

const YouTubeVideo = ({ src }: { src: string }) => {
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
        const { text, Icon, url } = item
        return (
          <Button
            key={url}
            href={url}
            startIcon={<Icon />}
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
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pt: [1, 4],
        }}
        >
          <Box sx={{
            mt: -8,
            display: ['none', 'initial'],
          }}
          >
            <Harp />
          </Box>
          <Box width={[500]}>
            <Typography gutterBottom>
              Hello, I'm
              {' '}
              <b>Basil Breen</b>
              . I'm a singer & songwriter from
              {' '}
              <b>Dublin, Ireland.</b>
              {' '}
              I picked up the guitar back in 2014 and I've been exploring music ever since.
            </Typography>
            <Typography gutterBottom>
              Music has always provided me with an immense sense of awe and wonder. I hoard music across all genres and cultures. There are few experiences in this world that compare with finding a new song that is able to bury itself deep within your bones.
            </Typography>
            <Typography gutterBottom>
              Songs that understand. Songs that transcend explanation.
            </Typography>
            <Typography gutterBottom>
              Music has given me so much. And I am going to
              {' '}
              <b>give back to music</b>
              {' '}
              in whatever way I can.
            </Typography>
            <Box display="flex" sx={{ mt: 4 }}>
              <Button
                size="large"
                variant="outlined"
                color="secondary"
                onClick={() => {
                  copy('hello@basilbreen.com')
                  setMessage('Copied email address')
                }}
                startIcon={<EmailIcon color="secondary" fontSize="small" />}
              >
                Email
              </Button>
              <Button
                sx={{ ml: 2 }}
                size="large"
                variant="outlined"
                color="secondary"
                href="/podcast"
                startIcon={<span style={{ fontSize: 18 }}>🎧</span>}
              >
                Podcast
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            mt: [4, 8],
            mb: 8,
            textAlign: ['left', 'center'],
          }}
          display="flex"
          flexDirection={['column', 'row']}
          width="100%"
          justifyContent="space-between"
        >
          <Box width={['512px', '33%']}>
            <Typography
              gutterBottom
              sx={{
                typography: ['h5', 'h4'],
              }}
              component="h2"
            >
              Original Music
            </Typography>
            <YouTubeVideo src="https://www.youtube.com/embed/vedeoseries?list=PL8u6B-yLLbT7UVf5-KeQBXNp0QEE_25yx" />
          </Box>
          <Box width={['512px', '33%']}>
            <Typography
              gutterBottom
              sx={{
                typography: ['h5', 'h4'],
              }}
              component="h2"
            >
              Podcast
            </Typography>
            <YouTubeVideo src="https://www.youtube.com/embed/vedeoseries?list=PL8u6B-yLLbT5x4RsVpdCpaw-0koJ5BN43" />
          </Box>
          <Box width={['512px', '33%']}>
            <Typography
              gutterBottom
              sx={{
                typography: ['h5', 'h4'],
              }}
              component="h2"
            >
              Covers
            </Typography>
            <YouTubeVideo src="https://www.youtube.com/embed/vedeoseries?list=PL8u6B-yLLbT6EkFDqHZuWeJ1SlhaezS0T" />
          </Box>
        </Box>
        <Box width={1}>
          <Typography
            gutterBottom
            sx={{
              textAlign: ['left', 'center'],
              typography: ['h5', 'h4'],
            }}
            component="h2"
          >
            Socials & Music
          </Typography>
        </Box>
        <Section items={socials} />
        <Box
          sx={{
            mt: 8,
            display: 'flex',
          }}
        >
          <Link href="https://github.com/dunika/basil-breen">Source Code</Link>
          &nbsp;
          <span>|</span>
          &nbsp;
          <Link href="./thumbnail-generator">Thumbnail Generator</Link>
          &nbsp;
          <span>|</span>
          &nbsp;
          <Link href="./clipper">Podcast Clipper</Link>
        </Box>
      </Box>
    </Container>
  )
}


export default Home
