import {
  Container,
  TextField as MaterialTextField,
  Paper,
  InputAdornment,
  Button,
  Box,
} from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import {
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

const drawEpisodeNumber = (context: CanvasRenderingContext2D, number: string) => {
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

const drawDescription = (context: CanvasRenderingContext2D, description: string) => {
  setFontSize(context, 72)

  const rectWidth = 540
  const rectHeight = 382
  context.fillStyle = 'white'

  context.fillRect(540, 0, rectWidth + 80, rectHeight)
  context.fillStyle = 'black'

  fillWrappedText(context, {
    text: description.toUpperCase(),
    x: rectWidth + 40,
    y: 89,
    maxWidth: 540,
    lineHeight: 89,
  })
}

const initialize = (context: CanvasRenderingContext2D) => {
  const imageObj = new Image()
  imageObj.src = './images/podcast-template.png'

  imageObj.onload = async () => {
    await document.fonts.ready
    context.drawImage(imageObj, 0, 0)
  }
}

const ThumbnailGenerator: NextPage = () => {
  const [episodeNumber, setEpisodeNumber] = useState<string>('')
  const [description, setDescription] = useState('')
  const [context, setContext] = useState<CanvasRenderingContext2D>()
  const [canvas, setCanvas] = useState<HTMLCanvasElement>()

  const handleCanvasRef = useCallback((canvas: HTMLCanvasElement) => {
    if (canvas) {
      const context = canvas.getContext('2d')!
      setCanvas(canvas)
      setContext(context)
      initialize(context)
    }
  }, [])

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

  const download = useCallback(async () => {
    const image = canvas!.toDataURL('image/jpeg')
    const wideImage = await createImageFromCanvas({
      height: 1080,
      width: 1920,
      x: 420,
      y: 0,
      src: image,
    })

    const longImage = await createImageFromCanvas({
      height: 1920,
      width: 1080,
      x: 0,
      y: 420,
      src: image,
    })

    downloadImage(wideImage, 'Facebook_Youtube', episodeNumber)
    downloadImage(longImage, 'Instagram', episodeNumber)
    downloadImage(image, 'Spotify', episodeNumber)
  }, [canvas, episodeNumber])

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
          value={episodeNumber}
          onChange={({ target: { value } }) => setEpisodeNumber(value)}
          label="Episode"
          color="primary"
          sx={{
            width: 100,
            mb: 4,
          }}
          InputProps={{
            inputProps: {
              type: 'number',
            },
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
              if (context) {
                initialize(context)
              }
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
          width: 256,
          height: 256,
        }}
      >
        <canvas
          ref={handleCanvasRef}
          width="1080"
          height="1080"
        />
      </Box>
    </Container>
  )
}

export default ThumbnailGenerator
