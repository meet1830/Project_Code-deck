import React, {useContext} from "react";
import LeftPane from "./LeftPane";
import RightPane from "./RightPane";
import styled from "styled-components";
import Modal from "../../components/Modal";
import { ModalContext } from "../../context/ModalContext";

const HomeScreenContainer = styled.div`
  // display: grid;
  // grid-template-columns: 1fr 1.5fr;
  // not using grid bc when scroll the black portion also gets scrolled

  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 100vw;
  height: 100vh;
`;

const HomeScreen = () => {
  const makeAvailableGlobally = useContext(ModalContext)!;
  const isOpen = makeAvailableGlobally?.isOpen;
  
  return (
    <HomeScreenContainer>
      <LeftPane />
      <RightPane />
      {isOpen?.value === true ? <Modal /> : <></>}
    </HomeScreenContainer>
  );
};

export default HomeScreen;
