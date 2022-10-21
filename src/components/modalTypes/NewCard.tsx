import React from 'react'
import { RiCloseFill } from 'react-icons/ri';
import { CloseButton, ModalTypes } from '../Modal'

const NewCard = ({closeModal, identifier} : ModalTypes) => {
  return (
    <div>NewCard
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

export default NewCard