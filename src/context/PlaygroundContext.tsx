import { createContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

interface PlaygroundContextType {
  folders: any;
  setFolders: any;

  // want these functions to get accessed from the whole project
  createNewFolder: (folderTitle: string) => void;
  createNewPlayground: (
    folderId: string,
    cardTitle: string,
    cardLanguage: string
  ) => void;
  createNewFolderAndPlayground: (
    folderTitle: string,
    cardTitle: string,
    cardLanguage: string
  ) => void;
  editCardTitle: (
    folderId: string,
    cardId: string,
    newCardTitle: string
  ) => void;
  editFolderTitle: (folderId: string, newFolderTitle: string) => void;
  deleteCard: (folderId: string, cardId: string) => void;
  deleteFolder: (folderId: string) => void;
}

export const PlaygroundContext = createContext<PlaygroundContextType | null>(
  null
);

export interface FolderT {
  title: string;
  items: {
    [key: string]: {
      title: string;
      language: string;
    };
  };
}

export interface FolderType {
  [key: string]: FolderT;
}

// saving to local storage
const initialItems = {
  [uuid()]: {
    title: "Folder Title 1",
    items: {
      [uuid()]: {
        title: "Stack Implementation",
        language: "Cpp",
      },
      [uuid()]: {
        title: "Queue Implementation",
        language: "Cpp",
      },
      [uuid()]: {
        title: "Dequeue Implementation",
        language: "Cpp",
      },
    },
  },
  [uuid()]: {
    title: "Folder Title 2",
    items: {
      [uuid()]: {
        title: "Stack Implementation",
        language: "Cpp",
      },
      [uuid()]: {
        title: "Queue Implementation",
        language: "Cpp",
      },
      [uuid()]: {
        title: "Dequeue Implementation",
        language: "Cpp",
      },
    },
  },
};

// features left to implement
// CreateNewFolder()
// CreatenewPlayground(folderId)
// CreateNewFolderAndPlayground()
// EditCardTitle(folderId, cardId)
// EditFolderTitle(folderId)
// DeleteCard(folderId, cardId)
// DeleteFolder(folderId)

export default function PlaygroundProvider({ children }: { children: any }) {
  const [folders, setFolders] = useState(() => {
    // check if local data available or not
    const localData = JSON.parse(localStorage.getItem("playground-data") as string);
    // if dont have any local data then return initial items
    return localData || initialItems;
  });

  // save all data to local storage
  // use useeffect to trigger and update to local storage when there is any change in folders state
  useEffect(() => {
    localStorage.setItem("playground-data", JSON.stringify(folders));
  }, [folders]);

  // two ways to create new state in react
  // setFolders(newState)
  // setFolders(oldState => {
  //   const newState = {...oldState};
  //   return newState;
  // })
  // as a callback function inside it define a new function, spread the old state and return the new state
  // here use second method as want to update old state spread the old folders and in between create a new folder with new uuid and return new state

  const createNewFolder = (folderTitle: string) => {
    setFolders((oldState: any) => {
      const newState = { ...oldState };
      // create a new folder
      newState[uuid()] = {
        title: folderTitle,
        items: {},
      };
      return newState;
    });
  };

  const createNewPlayground = (
    folderId: string,
    cardTitle: string,
    cardLanguage: string
  ) => {
    setFolders((oldState: any) => {
      const newState = { ...oldState };
      // create new playground
      newState[folderId].items[uuid()] = {
        title: cardTitle,
        language: cardLanguage,
      };
      return newState;
    });
  };

  const createNewFolderAndPlayground = (
    folderTitle: string,
    cardTitle: string,
    cardLanguage: string
  ) => {
    setFolders((oldState: any) => {
      const newState = { ...oldState };
      // create a new folder and playground
      newState[uuid()] = {
        title: folderTitle,
        items: {
          [uuid()]: {
            title: cardTitle,
            language: cardLanguage,
          },
        },
      };
      return newState;
    });
  };

  const editCardTitle = (
    folderId: string,
    cardId: string,
    newCardTitle: string
  ) => {
    setFolders((oldState: any) => {
      const newState = { ...oldState };
      // update title
      newState[folderId].items[cardId].title = newCardTitle;
      return newState;
    });
  };

  const editFolderTitle = (folderId: string, newFolderTitle: string) => {
    setFolders((oldstate: any) => {
      const newState = { ...oldstate };
      newState[folderId].title = newFolderTitle;
      return newState;
    });
  };

  const deleteCard = (folderId: string, cardId: string) => {
    setFolders((oldState: any) => {
      const newState = { ...oldState };
      // use delete if want to remove a key
      delete newState[folderId].items[cardId];
      return newState;
    });
  };

  const deleteFolder = (folderId: string) => {
    setFolders((oldState: any) => {
      const newState = { ...oldState };
      delete newState[folderId];
      return newState;
    });
  };

  const makeAvailableGlobally: PlaygroundContextType = {
    folders: folders,
    setFolders: setFolders,

    createNewFolder: createNewFolder,
    createNewPlayground: createNewPlayground,
    createNewFolderAndPlayground: createNewFolderAndPlayground,
    editCardTitle: editCardTitle,
    editFolderTitle: editFolderTitle,
    deleteCard: deleteCard,
    deleteFolder: deleteFolder,
  };

  return (
    <PlaygroundContext.Provider value={makeAvailableGlobally}>
      {children}
    </PlaygroundContext.Provider>
  );
}
