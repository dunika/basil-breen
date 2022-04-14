import type { NextPage } from 'next'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Head from 'next/head'
import {
  Button,
  Paper,
} from '@mui/material'
import Link from '../src/Link'

const links = [
  {
    name: 'Apple Podcasts',
    url: 'https://podcasts.apple.com/us/podcast/the-basil-breen-boombox/id1618757190',
    image: <img
      alt="Apple Podcasts"
      width="18"
      height="18"
      src="https://d8g345wuhgd7e.cloudfront.net/site/images/admin5/apple-podcast.png"
    />,
  },
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/show/3vRzqRZjtAPyKBIDT2srlb',
    image: <img
      alt="Spotify"
      width="18"
      height="18"
      src="https://cdn.cdnlogo.com/logos/s/89/spotify.svg"
    />,
  },
  {
    name: 'Overcast',
    url: 'https://music.amazon.com/podcasts/a8e4c897-6479-466b-bfc5-98b2e53516eb',
    image: <img
      alt="Overcast"
      width="18"
      height="18"
      src="https://cdn.cdnlogo.com/logos/o/94/overcast.svg"
    />,
  },
  {
    name: 'Google Podcasts',
    url: 'https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkLnBvZGJlYW4uY29tL2Jhc2lsYnJlZW4vZmVlZC54bWw',
    image: <img
      alt="Overcast"
      width="18"
      height="18"
      src="https://cdn.cdnlogo.com/logos/g/76/google-podcasts.svg"
    />,
  },
]

const PodcastLinks: NextPage = () => {
  return (
    <Container maxWidth="lg" sx={{ px: 4 }}>
      <Head>
        <title>Basil Breen | Podcast Links</title>
      </Head>
      <Box
        sx={{
          my: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            width: '312px',
            py: 2,
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
          >
            The Basil Breen Boombox
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            Available whereever you get podcasts
          </Typography>
        </Box>
        <Paper
          sx={{
            px: 2,
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            pt: 2,
          }}
        >
          {links.map((link) => {
            return (
              <Button
                key={link.url}
                href={link.url}
                startIcon={link.image}
                size="large"
                target="_blank"
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
              >
                {link.name}
              </Button>
            )
          })}
        </Paper>

      </Box>
    </Container>
  )
}

export default PodcastLinks
