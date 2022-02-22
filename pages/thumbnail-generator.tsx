import {
  Container,
  TextField as MaterialTextField,
  Paper,
  InputAdornment,
  Button,
} from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import {
  useEffect,
  useRef,
  useState,
} from 'react'
import { blue } from '../src/theme'

const setFontSize = (context, value) => {
  context.font = `bold ${value}px Raleway`
}

const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
  const words = text.split(' ')
  let line = ''

  for (let n = 0; n < words.length; n++) {
    const testLine = `${line + words[n]} `
    const metrics = context.measureText(testLine)
    const testWidth = metrics.width
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y)
      line = `${words[n]} `
      y += lineHeight
    } else {
      line = testLine
    }
  }
  context.fillText(line, x, y)
}

const drawEpisodeNumber = (context, number) => {
  if (!number) {
    return
  }
  const text = `#${number}`
  setFontSize(context, 96)

  const { width } = context.measureText(text)
  context.fillStyle = 'black'

  const rectWidth = 80 + width
  const rectHeight = 152
  context.fillRect(1080 - rectWidth, 1080 - rectHeight, rectWidth, rectHeight)

  context.fillStyle = 'white'
  context.fillText(text, 1040 - width, 1040)
}

const downloadImage = (image, filename) => {
  const link = document.createElement('a')
  link.download = filename
  link.href = image
  link.click()
}

const drawDescription = (context, description) => {
  setFontSize(context, 72)

  const rectWidth = 540
  const rectHeight = 382
  context.fillStyle = 'white'

  context.fillRect(540, 0, rectWidth + 80, rectHeight)
  context.fillStyle = 'black'

  wrapText(context, description.toUpperCase(), rectWidth + 40, 89, 540, 89)
}

const initialize = (context) => {
  const imageObj = new Image()
  imageObj.src = './images/podcast-template.png'

  imageObj.onload = async () => {
    await document.fonts.ready
    context.drawImage(imageObj, 0, 0)
  }
}

const ThumbnailGenerator: NextPage = () => {
  const [episodeNumber, setEpisodeNumber] = useState()
  const [description, setDescription] = useState('')
  const [context, setContext] = useState()

  const canvas = useRef(null)

  useEffect(() => {
    if (canvas.current) {
      const context = canvas.current.getContext('2d')
      setContext(context)
    }
  }, [canvas.current])

  useEffect(() => {
    if (context) {
      initialize(context)
    }
  }, [context])

  useEffect(() => {
    if (context) {
      drawEpisodeNumber(context, episodeNumber)
    }
  }, [episodeNumber, context])

  useEffect(() => {
    if (context) {
      drawDescription(context, description)
    }
  }, [description, context])

  const download = () => {
    const wideCanvasContext = document.querySelector('#wide-canvas').getContext('2d')
    const longCanvasContext = document.querySelector('#long-canvas').getContext('2d')
    const currentImage = canvas.current.toDataURL('image/jpeg')

    const imageObj = new Image()
    imageObj.src = currentImage
    debugger
    imageObj.onload = async () => {
      await document.fonts.ready
      wideCanvasContext.drawImage(imageObj, 420, 0)
      longCanvasContext.drawImage(imageObj, 0, 420)
      const wideImage = document.querySelector('#wide-canvas').toDataURL('image/jpeg')
      const longImage = document.querySelector('#long-canvas').toDataURL('image/jpeg')
      downloadImage(wideImage, 'Facebook,Youtube')
      downloadImage(longImage, 'Instagram')
      downloadImage(currentImage, 'Spotify')
    }
  }

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Paper
          sx={{
            px: 4,
            py: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <MaterialTextField
            inputProps={{
              type: 'number',
            }}
            value={episodeNumber}
            onChange={({ target: { value } }) => setEpisodeNumber(value)}
            label="Episode"
            color="primary"
            sx={{
              width: 100,
              mb: 4,
            }}
            InputProps={{
              startAdornment: <InputAdornment sx={{ color: 'primary.main' }} position="start">#</InputAdornment>,
            }}
          />
          <MaterialTextField
            rows={3}
            multiline
            onChange={({ target: { value } }) => setDescription(value)}
            value={description}
            label="Description"
            sx={{
              mb: 2,
            }}
          />
          <Box sx={{ display: 'flex' }}>
            <Button
              sx={{ mr: 2 }}
              color="primary"
              onClick={() => {
                setEpisodeNumber('')
                setDescription('')
                initialize(context)
              }}
            >
              Reset
            </Button>
            <Button color="primary" onClick={download}>
              Download
            </Button>
          </Box>
        </Paper>
        <Box
          sx={{
            width: 512,
            height: 512,
          }}
        >
          <canvas
            ref={canvas}
            style={{
              top: 0,
              position: 'absolute',
              transform: 'scale(0.3)',
              transformOrigin: 'top left',

            }}
            id="canvas"
            width="1080"
            height="1080"
          />
          <canvas style={{ display: 'none' }} id="wide-canvas" width="1920" height="1080" />
          <canvas style={{ display: 'none' }} id="long-canvas" width="1080" height="1920" />
        </Box>
      </Box>
    </Container>
  )
}

export default ThumbnailGenerator
