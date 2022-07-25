import shuffle from 'lodash/shuffle.js'

const hashtags = {
  ireland: {
    tags: [
      'irish',
      'ireland',
      'irishcreater',
    ],
    music: [
      'irishmusician',
      'irelandmusic',
      'irishmusicscene',
    ],
    podcast: [
      'irishpodcast',
      'irishpodcaster',
    ],
  },
  dublin: {
    tags: [
      'dublin',
      'dublinireland',
    ],
    music: [
      'dublinmusician',
      'dublinmusic',
      'dublinmusicscene',
    ],
    podcast: [
      'dublinpodcast',
    ],
  },
  dublinTown: [
    'dublincity',
    'dublinstreets',
    'dublintown',
  ],
  graftonStreet: {
    tags: [
      'graftonstreet',
      'graftonstreetdublin',
    ],
    busking: [
      'graftonstreetbusker',
      'graftonstreetbusking',
      'graftonstreetbuskers',
    ],
  },
  henryStreet: {
    tags: [
      'henrystreet',
    ],
    busking: [
      'henrystreetdublin',
      'henrystreetbuskers',
      'henrystreetbusker',
      'henrystreetbusking',
    ],
  },
  skerries: {
    tags: [
      'skerries',
    ],
    busking: [
      'skerriesharbour',
      'skerriesbeach',
    ],
  },
  coverSong: [
    'coversong',
    'coversongs',
  ],
  originalMusic: [
    'originalmusic',
    'newmusic',
    'originalmusic',
    'originalmusician',
    'originalsong',
  ],
  podcast: [
    'podcast',
    'podcaster',
  ],
  busking: [
    'busking',
    'buskinglife',
    'streetperformer',
    'streetperformers',
    'streetperformance',
    'streetperform',
    'streetmusic',
    'street',
    'performance',
  ],
  livePerformance: [
    'buskinglive',
  ],
}

const getHashTagGroups = ({ locations, postTypes }) => {
  const locationGroupTags = locations.reduce((result, location) => {
    const locationTags = hashtags[location]
    const locationPostTypeTags = postTypes.flatMap((postType) => {
      return locationTags[postType]
    }).filter(Boolean)

    result.locationTags.push(locationTags.tags)
    result.locationPostTypeTags.push(locationPostTypeTags)
    return result
  }, {
    locationTags: [],
    locationPostTypeTags: [],
  })

  return {
    ...locationGroupTags,
    postTypeTags: postTypes.map((postType) => {
      return hashtags[postType]
    }).filter(Boolean),
  }
}

const getHashTags = (tagConfig, options = {}) => {
  const {
    max = 30,
    shouldShuffle = true,
  } = options
  const {
    locationTags,
    locationPostTypeTags,
    postTypeTags,
  } = getHashTagGroups(tagConfig)

  let tagGroups = [
    ...locationTags,
    ...locationPostTypeTags,
    ...postTypeTags,
  ]

  if (shouldShuffle) {
    tagGroups = shuffle([
      ...locationTags,
      ...locationPostTypeTags,
      ...postTypeTags,
    ]).map(shuffle)
  }

  let count = 0
  let result = ''
  while (count < max) {
    // count++
    const tagGroupIndex = count % tagGroups.length
    const tagGroup = tagGroups[tagGroupIndex]

    if (!tagGroup.length) {
      tagGroups.splice(tagGroupIndex, 1)
      if (!tagGroups.length) {
        break
      }
    }
    const tag = tagGroup.pop()
    if (tag) {
      result += `#${tag} `
      count++
    }
  }

  return result.trim()
}

const getTikTokMessage = (text, tagConfig) => {
  const hashtags = getHashTags(tagConfig)
  if (!text) {
    return hashtags
  }
  const splitHashtags = hashtags.split(' ')
  let result = text
  for (const tag of splitHashtags) {
    const next = `${result} ${tag}`
    if (next.length >= 150) {
      break
    }
    result = next
  }

  return result.trim()
}

const getInstagramMessage = (text, tagConfig) => {
  const hashtags = getHashTags(tagConfig, { max: 11 })
  if (!text) {
    return hashtags
  }
  return `
${text}

${hashtags}
`.trim()
}

const getFacebookMessage = (text, tagConfig) => {
  const hashtags = getHashTags(tagConfig, { max: 4, shuffle: false })
  if (!text) {
    return hashtags
  }
  return `
${text}

${hashtags}
`.trim()
}

const getYoutubeMessage = (text, tagConfig) => {
  const hashtags = getHashTags(tagConfig, { max: 15 })
  if (!text) {
    return hashtags
  }
  return `
  ${text}

Website: https://basilbreen.com

Spotify: https://open.spotify.com/artist/33JlGzdySKstj1KN0BGACE

IG: basilbreen
FB: basilbreen
TikTok: basilbreen
.
.
.
.
.
${hashtags}
`.trim()
}

const defaultTagsConfig = {
  facebook: {
    max: 3
  },
  instagram: {
    max: 11
  },
  youtube: {
    max: 15
  },
  tikTok: {}
}

export const getPostMessages = (text, tagConfigs) => {
  return {
    facebook: getFacebookMessage(text, tagConfigs),
    instagram: getInstagramMessage(text, tagConfigs),
    youtube: getYoutubeMessage(text, tagConfigs),
    tikTok: getTikTokMessage(text, tagConfigs),
  }
}

const ashtags = getHashTags({
  max: 11,
  locations: ['dublin', 'ireland', 'skerries'],
  postTypes: ['podcast'],
})

console.log(ashtags)
