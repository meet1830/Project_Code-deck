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

const NewCard = ({ closeModal, identifier }: ModalProps) => {
  // have to get folderId in which the card is to be created
  const { folderId } = identifier;

  const { folders, createNewPlayground } = useContext(PlaygroundContext)!;

  // create object for languages selection in select component
  const languageOptions = [
    { value: "c++", label: "C++" },
    { value: "java", label: "Java" },
    { value: "python", label: "Python" },
    { value: "javascript", label: "Javascript" },
  ];
  const [title, setTitle] = useState("");

  // here want to give user option to select and not type the language
  // default value selected will be first object of languageOptions - cpp and pass language as value in select
  const [language, setLanguage] = useState(languageOptions[0]);

  const handleLanguageChange = (selectedOption: any) => {
    // change in selected language will automatically get stored in langauge state
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
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Select
            options={languageOptions}
            value={language}
            onChange={handleLanguageChange}
          />
          <button
            onClick={() => {
              // language is an object with label and value as keys hence want to pass only values
              createNewPlayground(folderId, title, language.value);
              closeModal();
            }}
          >
            Create New Playground
          </button>
      </InputWithSelect>
    </div>
  );
};

export default NewCard;
