import React from 'react'

import Box from 'components/Box/Box'
import ModalContainer from 'components/ModalContainer/ModalContainer'
import Icon from 'components/Icon/Icon'
import Btn from 'components/Btn/Btn'
import Txt from 'components/Txt/Txt'

export default function ListHeader({ heading, modalIsOpen, setIsOpen, modal }) {
  return (
    <div className="display_flex flexJustifier_spaceBetween">
      <Box classes="bottom6">
        <Txt tag="h1" size="24" bold color="DefaultCopy" content={heading} />
      </Box>
      <Btn
        circle
        className="listHeader-addButton"
        onClick={() => setIsOpen(true)}
        content={<Icon type="Plus" classes="plus nudgeDown1 20" />}
      ></Btn>
      <ModalContainer
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        afterOpenModal={() => console.log('HERE')}
      >
        {modal}
      </ModalContainer>
    </div>
  )
}
