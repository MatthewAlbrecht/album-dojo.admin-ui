import React from 'react'
import Infinite from 'react-infinite'

import Spinner from 'components/Spinner/Spinner'

export default function DataLaist({
  handleInfiniteLoad,
  isInfiniteLoading,
  hasMore,
  children,
  className,
}) {
  return (
    <Infinite
      className={className}
      elementHeight={64}
      useWindowAsScrollContainer
      preloadBatchSize={Infinite.containerHeightScaleFactor(0.75)}
      preloadAdditionalHeight={Infinite.containerHeightScaleFactor(0.75)}
      onInfiniteLoad={handleInfiniteLoad}
      infiniteLoadBeginEdgeOffset={hasMore ? 512 : undefined}
      loadingSpinnerDelegate={<Spinner />}
      isInfiniteLoading={isInfiniteLoading}
    >
      {children}
    </Infinite>
  )
}
