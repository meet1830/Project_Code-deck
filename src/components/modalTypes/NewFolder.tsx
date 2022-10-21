import React from 'react'
import { RiCloseFill } from 'react-icons/ri';
import { CloseButton, ModalTypes } from '../Modal'

const NewFolder = ({closeModal, identifier} : ModalTypes) => {
  return (
    <div>NewFolder
        <CloseButton
          onClick={() => {
            closeModal();
          }}
        >
          <RiCloseFill />
        </CloseButton>
    </div>
  )
}

export default NewFolder