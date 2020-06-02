import React from 'react'

import { getImageSrc } from 'utils/srcSelector'
import Txt from 'components/Txt/Txt'
import Box from 'components/Box/Box'
import Img from 'components/Img/Img'

export default function AlbumCardSimple({ album }) {
  return (
    <div className="albumCardSimple">
      <Img rounded srcUrl={getImageSrc(110, album.images)} size="110" />
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
