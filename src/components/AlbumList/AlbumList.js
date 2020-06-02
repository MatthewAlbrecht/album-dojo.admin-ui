import React from 'react'
import Infinite from 'react-infinite'

import AlbumRow from 'components/AlbumRow/AlbumRow'
import Spinner from 'components/Spinner/Spinner'

export default function AlbumList({
  albums,
  handleInfiniteLoad,
  isInfiniteLoading,
  hasMore,
}) {
  return (
    <Infinite
      className="albumList"
      elementHeight={64}
      useWindowAsScrollContainer
      preloadBatchSize={Infinite.containerHeightScaleFactor(0.75)}
      preloadAdditionalHeight={Infinite.containerHeightScaleFactor(0.75)}
      onInfiniteLoad={handleInfiniteLoad}
      infiniteLoadBeginEdgeOffset={hasMore ? 512 : undefined}
      loadingSpinnerDelegate={<Spinner />}
      isInfiniteLoading={isInfiniteLoading}
    >
      {albums.map(album => (
        <AlbumRow key={album.id} album={album} />
      ))}
    </Infinite>
  )
}
