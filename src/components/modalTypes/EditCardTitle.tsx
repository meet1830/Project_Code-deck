import React from "react";
import { RiCloseFill } from "react-icons/ri";
import { CloseButton, ModalTypes } from "../Modal";

const EditCardTitle = ({ closeModal, identifier }: ModalTypes) => {
  return (
    <div>
      EditCardTitle
      <CloseButton
        onClick={() => {
          closeModal();
        }}
      >
        <RiCloseFill />
      </CloseButton>
    </div>
  );
};

export default EditCardTitle;
