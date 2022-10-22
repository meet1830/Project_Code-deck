import React, { useContext, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { PlaygroundContext } from "../../context/PlaygroundContext";

// styles imported from Modal.tsx
import { CloseButton, Header, Input, ModalProps } from "../Modal";

const EditCardTitle = ({ closeModal, identifier }: ModalProps) => {
  // extracting folderid and cardid from identifier to identify which card's title is to be changed
  const { folderId, cardId } = identifier;

  // access our card from folder state with the help of context api
  const { folders, editCardTitle } = useContext(PlaygroundContext)!;

  const [title, setTitle] = useState(
    folders[folderId].items[cardId].title as string
  );
  // setTitle(3) -> gives no error if 'as string' is not defined above

  return (
    <div>
      <Header>
        <h2>Edit Card Title</h2>
        <CloseButton onClick={() => closeModal()}>
          <RiCloseFill />
        </CloseButton>
      </Header>
      <Input>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={() => {
            editCardTitle(folderId, cardId, title);
            closeModal();
          }}
        >
          Update Title
        </button>
      </Input>
    </div>
  );
};

export default EditCardTitle;
