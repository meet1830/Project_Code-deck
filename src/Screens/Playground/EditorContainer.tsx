import React, { useContext, useState } from "react";
import CodeEditor from "./CodeEditor";
import styled from "styled-components";
import { BiFullscreen } from "react-icons/bi";
import { BiImport } from "react-icons/bi";
import { BiExport } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { AiFillPlayCircle } from "react-icons/ai";
import Select from "react-select";
import { ModalContext } from "../../context/ModalContext";

const StyledEditorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const UpperToolbar = styled.div`
  background: white;
  height: 4rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  h3 {
    font-size: 1.3rem;
  }

  button {
    background: transparent;
    font-size: 1.3rem;
    border: 0;
    outline: 0;
  }
`;

const LowerToolbar = styled.div`
  background: white;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;

  button {
    background: transperant;
    outline: 0;
    border: 0;
    font-size: 1.1rem;

    display: flex;
    align-items: center;
    gap: 0.75rem;

    svg {
      font-size: 1.4rem;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
`;

const RunCode = styled.button`
  padding: 0.8rem 2rem;
  background: #5cb85c;
  color: white;
  font-weight: 700;
  border-radius: 2rem;

  svg {
    font-size: 1.4rem;
  }
`;

const SaveCode = styled.button`
  padding: 0.4rem 1rem;
  background: #5cb85c;
  color: white;
  font-weight: 700;
  border-radius: 2rem;
  border: 0;
`;

const SelectBars = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  &>div: nth-of-type(1) {
    width: 9rem;
  }
  &>div: nth-of-type(2) {
    width: 12rem;
  }
`;

// creating interface for accepting props from index.tsx
// now add here that there is code also
interface EditorContainerProps {
  title: string;
  language: string;
  code: string;
  
  // accepting folderid and cardId from index.tsx to edit title
  folderId: string;
  cardId: string;
}

const EditorContainer: React.FC<EditorContainerProps> = ({
  title,
  language,
  code,
  folderId,
  cardId
}) => {

  // import openModal function to edit title
  const {openModal} = useContext(ModalContext)!;

  // value = store for ourselves, labels = shown to the user
  const languageOptions = [
    { value: "c++", label: "C++" },
    { value: "java", label: "Java" },
    { value: "python", label: "Python" },
    { value: "javascript", label: "Javascript" },
  ];

  const themeOptions = [
    { value: "duotoneLight", label: "duotoneLight" },
    { value: "duotoneDark", label: "duotoneDark" },
    { value: "xcodeLight", label: "xcodeLight" },
    { value: "xcodeDark", label: "xcodeDark" },
    { value: "okaidia", label: "okaidia" },
    { value: "githubDark", label: "githubDark" },
    { value: "githubLight", label: "githubLight" },
    { value: "bespin", label: "bespin" },
    { value: "darcula", label: "darcula" },
  ];

  // drop down value preselected to the language mentioned by the user at homepage and github dark
  const [selectedLanguage, setSelectedLanguage] = useState(
    // loop over all the language options and check which language options has the user selected
    () => {
      for (let i = 0; i < languageOptions.length; i++) {
        if (languageOptions[i].value === language) return languageOptions[i];
      }
      // if not matching any language then return 0th language
      return languageOptions[0];
    }
  );
  const [selectedTheme, setSelectedTheme] = useState({
    value: "githubDark",
    label: "githubDark",
  });

  const handleChangeLanguage = (selectedOption: any) => {
    setSelectedLanguage(selectedOption);
  };

  const handleChangeTheme = (selectedOption: any) => {
    setSelectedTheme(selectedOption);
  };

  return (
    <StyledEditorContainer>
      <UpperToolbar>
        <Title>
          <h3>{title}</h3>
          <button onClick={() => {
            // open an edit modal to edit card title
            openModal({
              value: true,
              type: "1",
              identifier: {
                folderId: folderId,
                cardId: cardId,
              }
            })
          }}>
            <BiEditAlt />
          </button>
        </Title>
        <SelectBars>
          <SaveCode>Save Code</SaveCode>
          <Select
            value={selectedLanguage}
            options={languageOptions}
            onChange={handleChangeLanguage}
          />
          <Select
            value={selectedTheme}
            options={themeOptions}
            onChange={handleChangeTheme}
          />
        </SelectBars>
      </UpperToolbar>

      {/* have to pass language and theme to codeeditor that is selected from header */}
      {/* now pass the code received from index.tsx to codeeditor */}
      <CodeEditor
        currentLanguage={selectedLanguage.value}
        currentTheme={selectedTheme.value}
        currentCode={code}
      />

      <LowerToolbar>
        <ButtonGroup>
          <button>
            <BiFullscreen /> Full Screen
          </button>
          <button>
            <BiImport /> Import Code
          </button>
          <button>
            <BiExport /> Export Code
          </button>
        </ButtonGroup>
        <RunCode>
          <AiFillPlayCircle /> Run Code
        </RunCode>
      </LowerToolbar>
    </StyledEditorContainer>
  );
};

export default EditorContainer;
