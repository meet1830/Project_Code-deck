import React, { useContext } from "react";
import EditorContainer from "./EditorContainer";
import InputConsole from "./InputConsole";
import Navbar from "./Navbar";
import OutputConsole from "./OutputConsole";
import { useParams } from "react-router-dom";
import { PlaygroundContext } from "../../context/PlaygroundContext";

const Playground = () => {
  const { folderId, playgroundId } = useParams();
  // reading the folderid and playgroundid from the url using useparams, if render folder id and playground id here will see the numbers/string as in the url

  // access all playgrounds
  const {folders} = useContext(PlaygroundContext)!;
  const {title, language} = folders[folderId as string].items[playgroundId as string];

  return (
    <div>
      <Navbar />
      <div>
        <EditorContainer />
        <div>
          <InputConsole />
          <OutputConsole />
        </div>
      </div>
    </div>
  );
};

export default Playground;
