import { useContext } from "react";
import styled from "styled-components";
import { ModalContext } from "../context/ModalContext";
import { RiCloseFill } from "react-icons/ri";
import { PlaygroundContext } from "../context/PlaygroundContext";

const ModalContainer = styled.div`
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

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CloseButton = styled.div`
  background: transperant;
  outline: 0;
  border: 0;
  font-size: 2rem;
  cursor: pointer;
`;

const Input = styled.div`
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

const EditCardModal = ({ setIsOpen, isOpen }: { setIsOpen: any, isOpen: any }) => {
  const PlaygroundFeatures = useContext(PlaygroundContext)!;
  const folders = PlaygroundFeatures.folders;

  const currentFolder = folders[isOpen.identifier.folderId];
  const currentCard = currentFolder.items[isOpen.identifier.cardId];

  return (
    <div>
      <Header>
        <h2 className="Heading">Edit Cards Title</h2>
        <CloseButton
          onClick={() => {
            setIsOpen({
              value: false,
              type: "",
              identifier: {
                folderId: "",
                cardId: "",
              },
            });
          }}
        >
          <RiCloseFill />
        </CloseButton>
      </Header>
      <Input>
        <input type="text" value={currentCard.title} />
        <button>Update Title</button>
      </Input>
    </div>
  );
};

const Modal = () => {
  const ModalFeatures = useContext(ModalContext)!;
  const setIsOpen = ModalFeatures.setIsOpen;
  const isOpen = ModalFeatures.isOpen;

  return (
    <ModalContainer>
      <ModalContent>
        {isOpen.type === "1" && <EditCardModal setIsOpen={setIsOpen} isOpen={isOpen} />}
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
