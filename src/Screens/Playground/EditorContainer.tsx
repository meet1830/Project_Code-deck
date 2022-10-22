import React, { useState } from "react";
import CodeEditor from "./CodeEditor";
import styled from "styled-components";
import { BiFullscreen } from "react-icons/bi";
import { BiImport } from "react-icons/bi";
import { BiExport } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { AiFillPlayCircle } from "react-icons/ai";
import Select from "react-select";

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
  padding: 1rem 2rem;
  background: #5cb85c;
  color: white;
  font-weight: 700;
  border-radius: 2rem;

  svg {
    font-size: 1.4rem;
  }
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

const EditorContainer = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);

  // value = store of ourselves, labels = shown to the user
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
          <h3>Stack Implementaion</h3>
          <button>
            <BiEditAlt />
          </button>
        </Title>
        <SelectBars>
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

      <CodeEditor />

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
