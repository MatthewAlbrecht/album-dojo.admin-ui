import React from 'react'

import Txt from 'components/Txt/Txt'
export default function ItemSection({ heading, children }) {
  return (
    <div className="itemSection">
      <div className="itemSection-header">
        <Txt tag="h2" size="18" color="Grey" semibold content={heading} />
      </div>
      <div className="itemSection-content">{children}</div>
    </div>
  )
}
