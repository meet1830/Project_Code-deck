import { useContext } from "react";
import styled from "styled-components";
import { ModalContext } from "../context/ModalContext";
import { RiCloseFill } from "react-icons/ri";
import { PlaygroundContext } from "../context/PlaygroundContext";
import EditCardTitle from "./modalTypes/EditCardTitle";
import EditFolderTitle from "./modalTypes/EditFolderTitle";
import NewCard from "./modalTypes/NewCard";
import NewFolder from "./modalTypes/NewFolder";
import NewFolderAndPlayground from "./modalTypes/NewFolderAndPlayground";
import Loading from "./modalTypes/Loading";

export const ModalContainer = styled.div`
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  width: 35%;
  padding: 2rem;
  border-radius: 10px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CloseButton = styled.div`
  background: transperant;
  outline: 0;
  border: 0;
  font-size: 2rem;
  cursor: pointer;
`;

export const Input = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;
  gap: 2rem;
  padding-bottom: 0;

  input {
    flex-grow: 1;
    height: 2rem;
  }

  button {
    background: #241f21;
    padding: 1rem;
    color: white;
    height: 2rem;
    padding: 0 2rem;
  }
`;



export interface ModalProps {
  closeModal : () => void;
  identifier: {
    folderId: string;
    cardId: string;
  }
}

const Modal = () => {
  const ModalFeatures = useContext(ModalContext)!;
  const { closeModal } = ModalFeatures;
  const isOpen = ModalFeatures.isOpen;

  // types of modals
  // 1 => editCardTitle
  // 2 => editFolderTitle
  // 3 => newCard
  // 4 => newFolder
  // 5 => newFolderAndPlayground -> from left pane
  // 6 => loading

  return (
    <ModalContainer>
      <ModalContent>
        {isOpen.type === "1" && (
          <EditCardTitle
            closeModal={closeModal}
            identifier={isOpen.identifier}
          />
        )}
        {isOpen.type === "2" && (
          <EditFolderTitle
            closeModal={closeModal}
            identifier={isOpen.identifier}
          />
        )}
        {isOpen.type === "3" && (
          <NewCard closeModal={closeModal} identifier={isOpen.identifier} />
        )}
        {isOpen.type === "4" && (
          <NewFolder closeModal={closeModal} identifier={isOpen.identifier} />
        )}
        {isOpen.type === "5" && (
          <NewFolderAndPlayground closeModal={closeModal} identifier={isOpen.identifier} />
        )}
        {isOpen.type === "6" && (
          <Loading />
        )}
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
