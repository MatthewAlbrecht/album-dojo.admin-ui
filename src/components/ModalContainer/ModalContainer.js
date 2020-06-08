import React from 'react'
import Modal from 'react-modal'

import Icon from 'components/Icon/Icon'

export default function ModalContainer({
  modalIsOpen,
  setIsOpen,
  afterOpenModal,
  children,
}) {
  return (
    <Modal
      isOpen={modalIsOpen}
      contentLabel="MY EXEMPALE"
      onAfterOpen={afterOpenModal}
      onRequestClose={() => setIsOpen(false)}
      className="Modal"
    >
      <button
        onClick={() => setIsOpen(false)}
        className="modalContainer-closeButton"
      >
        <Icon type="Times" classes="times 16"></Icon>
      </button>
      {children}
    </Modal>
  )
}
