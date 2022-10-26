import React, { useContext, useState } from "react";
import EditorContainer from "./EditorContainer";
import InputConsole from "./InputConsole";
import Navbar from "./Navbar";
import OutputConsole from "./OutputConsole";
import { useParams } from "react-router-dom";
import {
  languageMap,
  PlaygroundContext,
} from "../../context/PlaygroundContext";
import styled from "styled-components";
import { ModalContext } from "../../context/ModalContext";
import Modal from "../../components/Modal";
import { Buffer } from "buffer";
import axios from "axios";

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
  const { folders, savePlayground } = useContext(PlaygroundContext)!;
  const { title, language, code } =
    folders[folderId as string].items[playgroundId as string];
  // pass the title and language to editorcontainer to display initial lang and theme as chosen by the user

  // access open field
  const { isOpen, openModal, closeModal } = useContext(ModalContext)!;

  // running our code
  // need 3 things for that - source code, input, language
  // collect the above things that exist in our code at different places so that we can call the api
  // hence create states for all the three things
  const [currentCode, setCurrentCode] = useState(code);
  const [currentInput, setCurrentInput] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState(language);

  // to show in output create the output state
  const [currentOutput, setCurrentOutput] = useState("");

  // save our code
  // for that we need currentcode and currentlanguage
  // current language bc if the user creates playground for one lang and codes in other than our homepage may not get updated hence
  const saveCode = () => {
    // creating this function in playground context
    savePlayground(
      folderId as string,
      playgroundId as string,
      currentCode,
      currentLanguage
    );
  };

  // encode function - need to encode the stdin and code before passing it to out api
  // converts normal string to base64 encoded string
  const encode = (str: string) => {
    // return encoded string
    return Buffer.from(str, "binary").toString("base64");
  };

  // decode to show the output
  const decode = (str: string) => {
    return Buffer.from(str, "base64").toString();
  };

  const postSubmission = async (
    language_id: number,
    source_code: string,
    stdin: string
  ) => {
    // make post request to judge0 to run our submission and get token
    // get this from judge 0 rapid api dashboard -> submissions -> create a submission -> and in Node.js axios should be selected -> copy options object
    // in that here deleting the data value cause doing that manually here
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "efb2136ea9mshfc40ab6d78fbfcfp13d288jsnae477fb58cbc",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: JSON.stringify({
        language_id: language_id,
        source_code: source_code,
        stdin: stdin,
      }),
    };

    // call the api using axios
    const res = await axios.request(options);
    return res.data.token;
  };

  const getOutput: (token: string) => any = async (token: string) => {
    // make api call
    // get this from submissions - get a submission
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Key": "efb2136ea9mshfc40ab6d78fbfcfp13d288jsnae477fb58cbc",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
    };

    // call the api
    const res = await axios.request(options);

    // go to judge 0 rapid api dashboard - statuses - get statuses
    // in there <= 2 is compiling. hence it is the case then we recursively call the function again to get the required output
    // happens in the case of long code
    if (res.data.status_id <= 2) {
      const res2 = await getOutput(token);
      return res2.data;
    }

    return res.data;
  };

  // run the code
  // api(code, input, language)
  // response -> output
  // pass the output using setcurrentoutput
  // code runs in two parts first we send our parameters and get a token
  // second - using that token fetch the output for our submission
  const runCode = async () => {
    // set parameters that our api requires

    // show loading modal
    // set loading to true
    openModal({
      value: true,
      type: "6",
      identifier: {
        folderId: "",
        cardId: "",
      },
    });

    // exported language map so that can import it here
    const language_id = languageMap[currentLanguage].id;
    const source_code = encode(currentCode);
    const stdin = encode(currentInput);
    // pass these things to our api

    const token = await postSubmission(language_id, source_code, stdin);

    const res = await getOutput(token);

    const status_name = res.status.description;
    // code may not contain any output at all hence check (same for others)
    const decoded_output = decode(res.stdout ? res.stdout : "");
    // if the code contains error
    const decoded_compile_output = decode(
      res.compile_output ? res.compile_output : ""
    );
    // to display some other error
    const decoded_stderr = decode(res.stderr ? res.stderr : "");

    let final_output = "";
    if (res.status_id !== 3) {
      // this means that our code has some error
      if (decoded_compile_output === "") {
        // not a compile error but some other error
        final_output = decoded_stderr;
      } else {
        // not empty string then show error
        final_output = decoded_compile_output;
      }
    } else {
      // show output - stdout
      final_output = decoded_output;
    }

    setCurrentOutput(status_name + "\n\n" + final_output);

    // set loading = false
    closeModal();
  };

  // passing currentCode in editorcontainer so that the curr code is visible. it will not change local storage but will just change the current state, same for language

  return (
    <div>
      <Navbar />
      <MainApp>
        <EditorContainer
          title={title}
          currentLanguage={currentLanguage}
          currentCode={currentCode}
          setCurrentLanguage={setCurrentLanguage}
          setCurrentCode={setCurrentCode}
          folderId={folderId as string}
          cardId={playgroundId as string}
          saveCode={saveCode}
          runCode={runCode}
        />
        <Consoles>
          <InputConsole
            currentInput={currentInput}
            setCurrentInput={setCurrentInput}
          />
          <OutputConsole currentOutput={currentOutput} />
        </Consoles>
      </MainApp>
      {/* to edit the title on playground */}
      {isOpen?.value === true ? <Modal /> : <></>}
    </div>
  );
};

export default Playground;
