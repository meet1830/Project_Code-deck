import React from "react";
import ModalProvider from "./context/ModalContext";
import PlaygroundProvider from "./context/PlaygroundContext";
import HomeScreen from "./Screens/Homescreen";
import GlobalStyles from "./styles/global";

function App() {
  return (
    <PlaygroundProvider>
      <ModalProvider>
        <GlobalStyles />
        <HomeScreen />
      </ModalProvider>
    </PlaygroundProvider>
  );
}

export default App;
