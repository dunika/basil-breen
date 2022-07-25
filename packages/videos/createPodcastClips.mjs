#!/usr/bin/env zx
/* eslint-disable no-restricted-syntax */

const clips = [
  {
    start: '1',
    end: '2',
    caption: 'This is the caption This is the caption',
    episode: '24',
  },
]

const scaleAndPad = 'scale=1080:-1,pad=width=1080:height=1920:x=0:y=660:color=black'
const overlayFrame = 'overlay=x=0:y=0'

const getDrawCaption = (caption) => {
  const words = caption.split(' ')
  console.log(caption.length, ' LENG')
  if(caption.length < 28 || words.length === 1 ) {
    return `drawtext=text='${clip.caption}':fontcolor=black:fontsize=70:box=1:boxcolor=white:boxborderw=30:x=(w-text_w)/2:y=620-(text_h/2)`
  }
  const half = Math.ceil(words.length/2)
  const lineOne = words.slice(0, half).join(' ')
  const lineTwo = words.slice(half, words.length).join(' ')

  const drawLineOne =  `drawtext=text='${lineOne}':fontcolor=black:fontsize=70:box=1:boxcolor=white:boxborderw=30:x=(w-text_w)/2:y=560-(text_h/2)`
  const drawLineTwo =  `drawtext=text='${lineTwo}':fontcolor=black:fontsize=70:box=1:boxcolor=white:boxborderw=30:x=(w-text_w)/2:y=660-(text_h/2)`
  return `${drawLineOne},${drawLineTwo}`
}

for (const clip of clips) {
  const drawCaption = getDrawCaption(clip.caption)
  const drawEpisode = `drawtext=text='#${clip.episode}':fontcolor=black:fontsize=70:box=1:boxcolor=white:boxborderw=30:x=(w-text_w)/2:y=400-(text_h/2)`
  const output = `./files/clips/${clip.episode}_${clip.caption}.mp4`.replaceAll(' ', '_').toLowerCase()

  const filter = `[0:v]${scaleAndPad}[scaled];[scaled][1:v]${overlayFrame}[framed];[framed]${drawEpisode},${drawCaption}`
  console.log(filter)
  await $`ffmpeg -i ${argv.i} -i podcast_frame.png -filter_complex ${filter} -codec:a copy ${output}`
}
