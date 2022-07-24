import Head from 'next/head'
import { AppProps as NextAppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import NextLink from 'next/link'

import {
  CacheProvider,
  EmotionCache,
} from '@emotion/react'
import '../src/global.css'
import {
  AppBar,
  Avatar,
  Container,
} from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useState } from 'react'
import createEmotionCache from '../src/createEmotionCache'
import theme from '../src/theme'
import { socials } from '../src/socials'
import Link from '../src/Link'

const clientSideEmotionCache = createEmotionCache()

interface AppProps extends NextAppProps {
  emotionCache?: EmotionCache
}

const drawerWidth = 240

const navItems = [{
  text: 'Podcast',
  icon: <span style={{ fontSize: 18 }}>🎧</span>,
  href: '/podcast',
}]

const iconProps = {
  Apple: {
    fontSize: 48,
    paddingBottom: 5,
    ml: 0,
  },
  YouTube: {
    fontSize: 50,
  },
}

export default function App(props: AppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map(({ text, href }) => (
          <ListItem key={text} disablePadding>
            <NextLink passHref href={href}>
              <ListItemButton sx={{ textAlign: 'center' }} href={href}>
                <ListItemText primary={text} />
              </ListItemButton>
            </NextLink>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  const container = typeof window !== 'undefined' ? () => window.document.body : undefined

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar component="nav" color="secondary" position="relative">
          <Container disableGutters>
            <Toolbar
              color="primary"
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Link
                href="/"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  sx={{
                    width: 44,
                    height: 44,
                  }}
                  src="http://1.gravatar.com/avatar/0f4c1f27b44b7cc73a615377e5571788"
                />
                <Typography
                  variant="h5"
                  color="primary"
                  component="div"
                  sx={{
                    whiteSpace: 'nowrap',
                    fontWeight: 'bold',
                    ml: 1,
                    mr: [0, 2],
                  }}
                >
                  Basil Breen
                </Typography>
              </Link>
              <Box
                display="flex"
                sx={{
                  ml: ['auto'],
                  alignItems: 'center',
                }}
              >
                {socials.map((item) => {
                  const {
                    text, Icon, url, important,
                  } = item
                  const { paddingBottom, fontSize, ml } = iconProps[text] || {}
                  return (
                    <IconButton
                      color="primary"
                      sx={{
                        fontSize,
                        ml: [ml ?? 1],
                        display: [important ? 'inline-flex' : 'none', important ? 'inline-flex' : 'none', 'inline-flex'],
                      }}
                      key={text}
                      target="_blank"
                      href={url}
                    >
                      <Icon size={36} fontSize={fontSize || 42} paddingBottom={paddingBottom} />
                    </IconButton>
                  )
                })}
              </Box>
              <Box
                sx={{
                  ml: 'auto',
                  display: {
                    xs: 'none',
                    sm: 'block',
                  },
                }}
              >
                {navItems.map(({ href, text, icon }) => (
                  <NextLink href={href} passHref key={text}>
                    <Button
                      key={text}
                      sx={{
                        ml: 2,
                        color: '#fff',
                      }}
                      startIcon={icon}
                    >
                      {text}
                    </Button>
                  </NextLink>
                ))}
              </Box>
              {/* <IconButton
                color="primary"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  ml: 'auto',
                  display: { sm: 'none' },
                }}
              >
                <MenuIcon style={{ fontSize: 36 }} />
              </IconButton> */}
            </Toolbar>
          </Container>
        </AppBar>
        <Box component="nav">
          <Drawer
            anchor="right"
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: {
                xs: 'block',
                sm: 'none',
              },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}
