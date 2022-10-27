import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { DarkModeContext } from "../../DarkModeContext/DarkModeContext";

import { DarkTheme, LightTheme } from "../../DarkModeContext/DarkModes";

import MoonIcon from "../../styles/icons/MoonIcon";
import SunIcon from "../../styles/icons/SunIcon";

interface DarModeButtonProps {
  changeTheme: () => void;
}

const ButtonContainer = styled.div`
  position: absolute;
  right: 20px;
  top: 3px;
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ToggleButton = styled.input`
  -webkit-appearance: none;
  outline: none;
  width: 60px;
  height: 30px;
  background-color: #212121;
  border-radius: 50px;
  position: relative;
  transition: 0.4s;
  margin: 0 0.5rem;

  &:before {
    content: "";
    position: absolute;
    height: 30px;
    width: 30px;
    border-radius: 15px;
    top: 0;
    bottom: 0;
    background-color: #bdbdbd;
    transition: 0.4s;
  }

  &:checked {
    background-color: #bdbdbd;
  }
  &:checked:before {
    transform: translate(100%);
    background-color: #212121;
    transition: 0.4s;
  }
`;
function DarkModeToggleButton<DarModeButtonProps>({
  changeTheme,
}: {
  changeTheme: () => void;
}) {
  const darkTheme = React.useContext(DarkModeContext)!;
  let isDarkThemeOn = darkTheme.isDarkModeOn;
  let SetIsDarkThemeOn = darkTheme.setIsDarkModeOn;

  function handleChange() {
    changeTheme();
    SetIsDarkThemeOn(!isDarkThemeOn);
  }
  return (
    <ThemeProvider theme={isDarkThemeOn ? DarkTheme : LightTheme}>
      <ButtonContainer>
        {/* <h5 style={{ marginRight: "10px", color: "white" }}>Light</h5> */}
        <MoonIcon />
        <ToggleButton
          type="checkbox"
          className="toggle-button"
          onChange={handleChange}
          checked={isDarkThemeOn}
        />
        {/* <h5 style={{ marginLeft: "10px", color: "white" }}>Dark</h5> */}
        <SunIcon />
      </ButtonContainer>
    </ThemeProvider>
  );
}

export default DarkModeToggleButton;
