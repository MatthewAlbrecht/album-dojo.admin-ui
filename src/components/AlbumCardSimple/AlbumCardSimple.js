import React from 'react'

import Txt from 'components/Txt/Txt'
import Box from 'components/Box/Box'
import Img from 'components/Img/Img'

export default function AlbumCardSimple({ album }) {
  const getImageSrc = size => {
    const { images } = album
    if (!images || !images.length) return 'https://via.placeholder.com/300' // TODO: Make default "no album artwork img"
    let srcUrl = sortByKey(images, 'width').reduce((imageUrl, image) => {
      if (!imageUrl && image.width > size && image.height > size) {
        return image.url
      } else {
        return image.url
      }
    }, '')
    srcUrl = srcUrl ? srcUrl : images[0].url

    return srcUrl
  }

  const sortByKey = (array, key) => {
    function compare(a, b) {
      if (a[key] < b[key]) {
        return -1
      }
      if (a[key] > b[key]) {
        return 1
      }
      return 0
    }
    return array.sort(compare)
  }

  return (
    <div className="albumCardSimple">
      <Img rounded srcUrl={getImageSrc(110)} size="110" />
      <Box classes="left2">
        <Txt
          tag="h3"
          size="24"
          semibold
          color="DefaultCopy"
          content={album.name}
        />
        <Box classes="top1">
          <Txt
            tag="h3"
            size="18"
            color="Grey"
            content={album.artists.map(artist => artist.name).join(', ')}
          />
        </Box>
      </Box>
    </div>
  )
}
