import React from 'react'

import Box from 'components/Box/Box'
import Txt from 'components/Txt/Txt'
import Hr from 'components/Hr/Hr'

export default function CodeNameHeader({ name, code, type, image }) {
  return (
    <>
      <Box classes="bottom2">
        <div className="display_flex flexAligner_center">
          {image && (
            <Box classes="right2">
              <div className="codeNameHeader-image"></div>
            </Box>
          )}
          <div>
            <Box classes="bottom0_5">
              <Txt
                tag="span"
                size="14"
                semibold
                color="Grey"
                content={type}
                uppercase
                space="2"
              />
            </Box>
            <Txt
              className="display_inlineBlock"
              tag="h1"
              size="24"
              semibold
              color="DefaultCopy"
              content={name}
            />
            <Box classes="left1 inlineBlock">
              <Txt
                className="display_inlineBlock"
                tag="h1"
                size="20"
                semibold
                color="Grey"
                content={`(${code})`}
              />
            </Box>
          </div>
        </div>
      </Box>
      <Hr color="GreyLightest"></Hr>
    </>
  )
}
