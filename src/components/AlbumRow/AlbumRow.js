import React, { useState } from 'react'
import cn from 'classnames'
import { useDispatch } from 'react-redux'

import { setDuplicate } from 'state/actions/albums'
import { getImageSrc } from 'utils/srcSelector'
import Box from 'components/Box/Box'
import Img from 'components/Img/Img'
import Txt from 'components/Txt/Txt'
import Icon from 'components/Icon/Icon'
import AlbumRowTooltip from 'components/AlbumRowTooltip/AlbumRowTooltip'

export default function AlbumRow({ album, primaryDuplicate, duplicates = [] }) {
  const [isVisible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const albumRowClasses = cn([
    'albumRow',
    primaryDuplicate === album.id && 'albumRow_primaryDuplicate',
    duplicates.includes(album.id) && 'albumRow_duplicate',
  ])

  const handleRowClick = () => {
    if (primaryDuplicate) {
      dispatch(setDuplicate(album.id))
    }
  }

  return (
    <li className={albumRowClasses} onClick={handleRowClick}>
      <div className="albumRow-img">
        <Box classes="right2">
          <Img rounded srcUrl={getImageSrc(0, album.images)} size="40" />
        </Box>
      </div>
      <Txt
        className="albumRow-name"
        tag="p"
        size="18"
        color="DefaultCopy"
        content={album.name}
      />
      <Txt
        className="albumRow-artist"
        tag="p"
        size="16"
        color="Grey"
        content={album.artists.map(artist => artist.name).join(', ')}
      />
      <Box classes="left1">
        <a
          href={`http://open.spotify.com/album/${album.spotifyId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="albumRow-spotifyIcon"
        >
          <Icon type="Spotify" classes="spotify nudgeDown2 20" />
        </a>
      </Box>
      <Box classes="left1">
        <button
          className="albumRow-menuIcon"
          onClick={() => setVisible(!isVisible)}
        >
          <Icon type="EllipsisV" classes="ellipsis nudgeDown2 20" />
        </button>
      </Box>
      {isVisible && <AlbumRowTooltip setVisible={setVisible} album={album} />}
    </li>
  )
}
