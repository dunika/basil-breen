export const setFontSize = (
  context: CanvasRenderingContext2D,
  value: number,
  fontFamily = 'Raleway',
) => {
  context.font = `bold ${value}px ${fontFamily}`
}

type FillWrappedTextConfig = {
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
}

export const fillWrappedText = (
  context: CanvasRenderingContext2D,
  config: FillWrappedTextConfig,
) => {
  const {
    text,
    x,
    maxWidth,
    lineHeight,
  } = config

  let { y } = config

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

export const downloadImage = (
  image: string,
  filename: string,
  episodeNumber: string,
) => {
  const link = document.createElement('a')
  link.download = `${filename}_${episodeNumber}`
  link.href = image
  link.click()
}

type CreateImageFromCanvasConfig = {
  height: number,
  width: number,
  src: string,
  x?: number,
  y?: number,
  type?: string,
}

export const createImageFromCanvas = (config: CreateImageFromCanvasConfig): Promise<string> => {
  const {
    height,
    width,
    src,
    x = 0,
    y = 0,
    type = 'image/jpeg',
  } = config
  const canvas = document.createElement('canvas')
  canvas.height = height
  canvas.width = width
  const context = canvas.getContext('2d')!
  const image = new Image()
  image.src = src

  return new Promise((resolve, reject) => {
    image.onload = async () => {
      context.drawImage(image, x, y)
      resolve(canvas.toDataURL(type))
    }
    image.onerror = reject
  })
}
