import React from 'react'
import { RiCloseFill } from 'react-icons/ri';
import { CloseButton, ModalTypes } from '../Modal'

const EditFolderTitle = ({closeModal, identifier} : ModalTypes) => {
  return (
    <div>EditFolderTitle
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

export default EditFolderTitle