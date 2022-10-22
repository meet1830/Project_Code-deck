import React, { useContext, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { PlaygroundContext } from "../../context/PlaygroundContext";
import styled from "styled-components";
import Select from "react-select";

import { CloseButton, Header, ModalProps } from "../Modal";

const InputWithSelect = styled.div`
  // we have to style it differently because it has a select inside it

  display: grid;
  grid-template-columns: 1fr 0.5fr;
  row-gap: 1rem;
  column-gap: 1rem;
  margin-top: 1.2rem;
  align-items: center;

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

const NewFolderAndPlayground = ({ closeModal, identifier }: ModalProps) => {
  const { createNewFolderAndPlayground } = useContext(PlaygroundContext)!;

  const languageOptions = [
    { value: "c++", label: "C++" },
    { value: "java", label: "Java" },
    { value: "python", label: "Python" },
    { value: "javascript", label: "Javascript" },
  ];
  const [folderTitle, setFolderTitle] = useState("");
  const [cardTitle, setCardTitle] = useState("");

  const [language, setLanguage] = useState(languageOptions[0]);

  const handleLanguageChange = (selectedOption: any) => {
    setLanguage(selectedOption);
  };

  return (
    <div>
      <Header>
        <h2>Create New Playground</h2>
        <CloseButton onClick={() => closeModal()}>
          <RiCloseFill />
        </CloseButton>
      </Header>
      <InputWithSelect>
        <label>Enter Folder Name</label>
        <input
          type="text"
          value={folderTitle}
          onChange={(e) => setFolderTitle(e.target.value)}
        />
        <label>Enter Card Name</label>
        <input
          type="text"
          value={cardTitle}
          onChange={(e) => setCardTitle(e.target.value)}
        />
        <Select
          options={languageOptions}
          value={language}
          onChange={handleLanguageChange}
        />
        <button
          onClick={() => {
            createNewFolderAndPlayground(
              folderTitle,
              cardTitle,
              language.value
            );
            closeModal();
          }}
        >
          Create New Playground
        </button>
      </InputWithSelect>
    </div>
  );
};

export default NewFolderAndPlayground;
