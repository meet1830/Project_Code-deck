import React, { useContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import { IoTrashOutline } from "react-icons/io5";
import { BiEditAlt } from "react-icons/bi";
import { ModalContext } from "../../context/ModalContext";
import { PlaygroundContext } from "../../context/PlaygroundContext";
import { useNavigate } from "react-router-dom";

import { DarkModeContext } from "../../DarkModeContext/DarkModeContext";
import { DarkTheme, LightTheme } from "../../DarkModeContext/DarkModes";
import DarkModeToggleButton from "./DarkModeToggleButton";

interface HeaderProps {
  readonly variant: string;
}

interface HeadingProps {
  readonly size: string;
}

const StyledRightPane = styled.div`
  padding: 2rem;
  height: 100vh;
  // background: #fafafa;
  background: ${(props) => props.theme.body}
  position: absolute;
  right: 0;
  top: 0;
  width: 60%;
  color: ${(props) => props.theme.mainHeading};
`;

const Header = styled.div<HeaderProps>`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin-bottom: ${(props) =>
    props.variant === "main" ? "2.75rem" : "1.4rem"};

  &::after {
    position: absolute;
    content: "";
    bottom: -1.25rem;
    width: 100%;
    height: 2px;
    background: rgba(0, 0, 0, 0.25);
    display: ${(props) => (props.variant === "main" ? "block" : "none")};
  }
`;

const Heading = styled.h3<HeadingProps>`
  margin-top: 20px;
  font-weight: 400;
  font-size: ${(props) => (props.size === "large" ? "1.8rem" : "1.5rem")};

  span {
    font-weight: 700;
  }
`;

const AddButton = styled.button`
  margin-top: 20px;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  background: transparent;
  outline: 0;
  border: 0;
  font-size: 1.1rem;
  cursor: pointer;

  span {
    font-size: 1.75rem;
    font-weight: 700;
  }

  transition: all 0.25s ease;
  &:hover {
    opacity: 0.75;
  }

  color: ${(props) => props.theme.mainHeading};
`;

const Folder = styled.div`
  margin: 0.5rem 0 2rem 0;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;
  row-gap: 2rem;
`;

const PlaygroundCard = styled.div`
  display: flex;
  align-items: center;
  padding: 0.6rem;
  gap: 1rem;
  // box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.1s ease;

  &:hover {
    opacity: 0.75;
  }
`;

const SmallLogo = styled.img`
  width: 75px;
`;

const CardContent = styled.div`
  flex-grow: 1;
  margin-left: -20px;
  color: "black";

  h5 {
    font-weight: 400;
    font-size: 1.2rem;
    margin-bottom: 0.25rem;
  }
`;

const Icons = styled.div`
  margin-top: 20px;
  align-items: center;
  display: flex;
  gap: 0.5rem;
  font-size: 1.25rem;
  padding-right: 1rem;
`;

const FolderButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const RightPane = () => {
  const makeAvailableGlobally = useContext(ModalContext)!;
  const { openModal } = makeAvailableGlobally;

  // use global folder structure
  const PlaygroundFeatures = useContext(PlaygroundContext)!;
  const Folders = PlaygroundFeatures.folders;
  const { deleteFolder, deleteCard } = PlaygroundFeatures;

  // initialize navigate
  const navigate = useNavigate();

  // dark mode
  const darkTheme = useContext(DarkModeContext)!;
  let isDarkThemeOn = darkTheme.isDarkModeOn;
  let SetIsDarkThemeOn = darkTheme.setIsDarkModeOn;

  function changeTheme() {
    SetIsDarkThemeOn(!isDarkThemeOn);
    console.log("Clicked");
  }

  return (
    <ThemeProvider theme={isDarkThemeOn ? DarkTheme : LightTheme}>
      <StyledRightPane>
        <Header variant="main">
          <Heading size="large">
            My <span>Playgrounds</span>
          </Heading>
          <AddButton
            onClick={() => {
              openModal({
                value: true,
                type: "4",
                identifier: {
                  folderId: "",
                  cardId: "",
                },
              });
            }}
          >
            <span>+</span> New Folder
          </AddButton>
        </Header>

        <DarkModeToggleButton changeTheme={changeTheme} />

        {/* dynamically generating folders */}
        {Object.entries(Folders).map(
          ([folderId, folder]: [folderId: string, folder: any]) => (
            <Folder>
              <Header variant="folder">
                <Heading size="small">{folder.title}</Heading>
                <FolderButtons>
                  <Icons>
                    <IoTrashOutline
                      onClick={() => {
                        // delete folder
                        deleteFolder(folderId);
                      }}
                    />
                    <BiEditAlt
                      onClick={() => {
                        openModal({
                          value: true,
                          type: "2",
                          identifier: {
                            folderId: folderId,
                            cardId: "",
                          },
                        });
                      }}
                    />
                  </Icons>
                  <AddButton
                    onClick={() => {
                      openModal({
                        value: true,
                        type: "3",
                        identifier: {
                          folderId: folderId,
                          cardId: "",
                        },
                      });
                    }}
                  >
                    <span>+</span> New Playground
                  </AddButton>
                </FolderButtons>
              </Header>

              <CardContainer>
                {/* dynamically generating items inside folders */}
                {Object.entries(folder.items).map(
                  ([cardId, card]: [cardId: string, card: any]) => (
                    <PlaygroundCard
                      onClick={() => {
                        // navigate to playground page
                        navigate(`/code/${folderId}/${cardId}`);
                      }}
                    >
                      <SmallLogo src="/logo-small.png" alt="" />
                      <CardContent>
                        <h5>{card.title}</h5>
                        <p>Language: {card.language}</p>
                      </CardContent>
                      <Icons
                        onClick={(e) => {
                          // to stop click propogation from child to parent
                          // if click on edit then also redirects to new playground page which we dont want
                          e.stopPropagation();
                        }}
                      >
                        <IoTrashOutline
                          onClick={() => {
                            // delete card
                            deleteCard(folderId, cardId);
                          }}
                        />
                        <BiEditAlt
                          onClick={() => {
                            openModal({
                              value: true,
                              type: "1",
                              identifier: {
                                folderId: folderId,
                                cardId: cardId,
                              },
                            });
                          }}
                        />
                      </Icons>
                    </PlaygroundCard>
                  )
                )}
              </CardContainer>
            </Folder>
          )
        )}
      </StyledRightPane>
    </ThemeProvider>
  );
};

export default RightPane;
