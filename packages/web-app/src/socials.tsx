import {
  Apple,
  YouTube,
  Facebook,
  Instagram,
} from '@mui/icons-material'

const buildIcon = ({
  icon: Icon,
  text,
  src,
  color,
}) => ({ size, fontSize, ...style }) => {
  if (Icon) {
    return (
      <Icon
        style={{
          color,
          fontSize: fontSize || 26,
          ...style,
        }}
      />
    )
  }
  return (
    <img
      alt={text}
      width={size || 18}
      height={size || 18}
      src={src}
      style={style}
    />
  )
}

export const socials = [
  {
    Icon: buildIcon({
      text: 'Spotify',
      src: 'https://cdn.cdnlogo.com/logos/s/89/spotify.svg',
    }),
    important: true,
    url: 'https://open.spotify.com/artist/33JlGzdySKstj1KN0BGACE?si=CUjZmtQ4TVW2B6zY9ZDG9Q',
    text: 'Spotify',
  },
  {
    Icon: buildIcon({
      icon: YouTube,
      color: '#FF0000',
    }),
    important: true,
    text: 'YouTube',
    url: 'https://www.youtube.com/channel/UCapU9dIhpBVnkEN3-ESAf0Q', // TODO
  },
  {
    Icon: buildIcon({
      icon: Instagram,
      color: '#833AB4',
    }),
    important: true,
    text: 'Instagram',
    url: 'https://www.instagram.com/basilbreen/',
  },
  {
    Icon: buildIcon({
      text: 'TikTok',
      src: 'https://cdn.cdnlogo.com/logos/t/6/tiktok-app-icon.svg',
    }),
    url: 'https://www.tiktok.com/@basilbreen?lang=en',
    text: 'TikTok',
  },
  {
    Icon: buildIcon({
      icon: Facebook,
      color: '#4267B2',
    }),
    text: 'Facebook',
    url: 'https://www.facebook.com/basilbreenlad',
  },
  {
    Icon: buildIcon({
      icon: Apple,
      color: '#999999',
    }),
    text: 'Apple',
    url: 'https://music.apple.com/us/artist/basil-breen/1563295587',
  },
]
