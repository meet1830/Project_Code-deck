import React from "react";
import ModalProvider from "./context/ModalContext";
import PlaygroundProvider from "./context/PlaygroundContext";
import HomeScreen from "./Screens/Homescreen";
import GlobalStyles from "./styles/global";
import Playground from "./Screens/Playground";
import {Route, Routes, Navigate, BrowserRouter} from "react-router-dom";
import Page404 from "./Screens/Page404";

function App() {
  return (
    <PlaygroundProvider>
      <ModalProvider>
        <GlobalStyles />
        {/* <HomeScreen /> */}
        {/* <Playground /> */}
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen/>}></Route>

          {/* example of dynamic route */}
          {/* : means a dynamic route it can have any value in it */}
          {/* enter any number after for eg code/1/2 and it will render playground */}
          <Route path="/code/:folderId/:playgroundId" element={<Playground/>}></Route>

          {/* for undefined urls/paths - defining 404 page */}
          {/* "*" means it will render the page if it is not any of the above */}
          {/* if entered random url then automatically redirects to the homepage */}
          {/* <Route path="*" element={<Navigate to={"/"}/>}></Route> */}
          <Route path="*" element={<Page404/>}></Route>

        </Routes>
        </BrowserRouter>
      </ModalProvider>
    </PlaygroundProvider>
  );
}

export default App;
