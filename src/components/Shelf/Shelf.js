import React from 'react'
import Txt from 'components/Txt/Txt'
import VList from 'components/VList/VList'

export default function Shelf() {
  return (
    <>
      <div className="shelf">
        <VList classes="2">
          <Txt
            tag="Link"
            to="/spotify"
            size="16"
            color="DefaultCopy"
            content="Spotify Syncing"
          />
          <Txt
            tag="Link"
            to="/albums"
            size="16"
            color="DefaultCopy"
            content="Albums"
          />
        </VList>
      </div>
    </>
  )
}
