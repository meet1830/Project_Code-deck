import React, { useContext } from "react";
import EditorContainer from "./EditorContainer";
import InputConsole from "./InputConsole";
import Navbar from "./Navbar";
import OutputConsole from "./OutputConsole";
import { useParams } from "react-router-dom";
import { PlaygroundContext } from "../../context/PlaygroundContext";
import styled from 'styled-components';
import { ModalContext } from "../../context/ModalContext";
import Modal from "../../components/Modal";

const MainApp = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  height: calc(100vh - 4.5rem); // height of navbar
`;

const Consoles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
`;

const Playground = () => {
  const { folderId, playgroundId } = useParams();
  // reading the folderid and playgroundid from the url using useparams, if render folder id and playground id here will see the numbers/string as in the url

  // access all playgrounds
  const {folders} = useContext(PlaygroundContext)!;
  const {title, language, code} = folders[folderId as string].items[playgroundId as string];
  // pass the title and language to editorcontainer to display initial lang and theme as chosen by the user

  // access open field
  const {isOpen} = useContext(ModalContext)!;

  return (
    <div>
      <Navbar />
      <MainApp>
        <EditorContainer title={title} language={language} code={code} folderId={folderId as string} cardId={playgroundId as string} />
        <Consoles>
          <InputConsole />
          <OutputConsole />
        </Consoles>
      </MainApp>
      {/* to edit the title on playground */}
      {isOpen?.value === true ? <Modal /> : <></>}
    </div>
  );
};

export default Playground;
