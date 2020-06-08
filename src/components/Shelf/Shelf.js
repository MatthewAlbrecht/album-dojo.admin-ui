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
            to="/achievements"
            size="16"
            color="DefaultCopy"
            content="Achievements"
          />
          <Txt
            tag="Link"
            to="/actions"
            size="16"
            color="DefaultCopy"
            content="Actions"
          />
          <Txt
            tag="Link"
            to="/albums"
            size="16"
            color="DefaultCopy"
            content="Albums"
          />
          <Txt
            tag="Link"
            to="/genres"
            size="16"
            color="DefaultCopy"
            content="Genres"
          />
          <Txt
            tag="Link"
            to="/permissions"
            size="16"
            color="DefaultCopy"
            content="Permissions"
          />
          <Txt
            tag="Link"
            to="/roles"
            size="16"
            color="DefaultCopy"
            content="Roles"
          />
          <Txt
            tag="Link"
            to="/users"
            size="16"
            color="DefaultCopy"
            content="Users"
          />
        </VList>
      </div>
    </>
  )
}
