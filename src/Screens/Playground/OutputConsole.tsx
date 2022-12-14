import React from "react";
import styled from "styled-components";
import ExportCode from "./ExportCode";

import { DarkModeContext } from "../../DarkModeContext/DarkModeContext";
import { ThemeProvider } from "styled-components";
import { DarkTheme, LightTheme } from "../../DarkModeContext/DarkModes";

const Console = styled.div`
  // background: white;
  background-color: ${(props) => props.theme.body} !important;
  color: ${(props) => props.theme.mainHeading};
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Header = styled.div`
  height: 4rem;
  // background: #ededed;
  background-color: ${(props) => props.theme.body} !important;
  color: ${(props) => props.theme.mainHeading};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.16);
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  font-size: 1.25rem;
  font-weight: 700;

  button {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 1rem;
    font-weight: 400;
    background: transparent;
    outline: 0;
    border: 0;
    color: ${(props) => props.theme.mainHeading};

    svg {
      font-size: 1.5rem;
    }
  }
`;

const OutputArea = styled.textarea`
  // background: #e7e7e7;
  background-color: ${(props) => props.theme.body} !important;
  color: ${(props) => props.theme.mainHeading};
  flex-grow: 1;
  padding: 0.25rem;
  padding-top: 0.5rem;
  font-size: 1.1rem;
  font-style: italic;
  resize: none;
`;

interface OutputConsoleProps {
  currentOutput: string;
}

const OutputConsole: React.FC<OutputConsoleProps> = ({ currentOutput }) => {
  const darkTheme = React.useContext(DarkModeContext)!;
  let isDarkThemeOn = darkTheme.isDarkModeOn;
  let SetIsDarkThemeOn = darkTheme.setIsDarkModeOn;

  return (
    <ThemeProvider theme={isDarkThemeOn ? DarkTheme : LightTheme}>
      <Console>
        <Header>
          Output:
          <ExportCode exportString={currentOutput} />
        </Header>
        <OutputArea value={currentOutput} disabled></OutputArea>
      </Console>
    </ThemeProvider>
  );
};

export default OutputConsole;
