import { createContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

interface PlaygroundContextType {
  folders: any;
  setFolders: any;

  // want these functions to get accessed in the whole project
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

  savePlayground: (
    folderId: string,
    cardId: string,
    newCode: string,
    newLanguage: string
  ) => void;
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

export const languageMap: {
  [key: string]: {
    id: number;
    defaultCode: string;
  };
} = {
  "c++": {
    id: 54,
    defaultCode:
      "#include<iostream>" +
      "\n" +
      "int main() {\n" +
      "      // your code here\n" +
      "      return 0; \n" +
      "}",
  },
  python: {
    id: 71,
    defaultCode: "# your code here",
  },
  javascript: {
    id: 63,
    defaultCode: "// your code here",
  },
  java: {
    id: 62,
    defaultCode: `import java.util.*;\nimport java.lang.*;\nimport java.io.*;\n\npublic class Main\n{\n\tpublic static void main (String[] args) throws java.lang.Exception\n\t{\n\t\t//your code here\n\t}\n}`,
  },
};

// saving to local storage
// reducing sample folder to just one folder and one card
// also want to pass the code that was written in the editor for that card so that we user again goes to the cards editor the code is saved there
// for that have to create a lang map
const initialItems = {
  [uuid()]: {
    title: "Folder Title 1",
    items: {
      [uuid()]: {
        title: "Playground Title 1",
        language: "C++",
        code: languageMap["c++"].defaultCode,
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
    let localData = JSON.parse(
      localStorage.getItem("playground-data") as string
    );

    // if there are no folders in homepage then show initial items
    // for that checking if localdata is an empty object
    // before that have to check if localdata is null or it is undefined or else object.keys will give an error
    localData =
      localData === undefined ||
      localData === null ||
      Object.keys(localData).length === 0
        ? null
        : localData;

    // if dont have any local data then return initial items
    return localData || initialItems; // null || anything = anything
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
      // now also entering the default code with new playground
      newState[folderId].items[uuid()] = {
        title: cardTitle,
        language: cardLanguage,
        code: languageMap[cardLanguage].defaultCode,
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
      // now also displaying the default code for the language
      newState[uuid()] = {
        title: folderTitle,
        items: {
          [uuid()]: {
            title: cardTitle,
            language: cardLanguage,
            code: languageMap[cardLanguage].defaultCode,
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

  // saving new code and new language in local storage
  const savePlayground = (
    folderId: string,
    cardId: string,
    newCode: string,
    newLanguage: string
  ) => {
    setFolders((oldState: any) => {
      const newState = { ...oldState };
      newState[folderId].items[cardId].code = newCode;
      newState[folderId].items[cardId].language = newLanguage;
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

    savePlayground: savePlayground,
  };

  return (
    <PlaygroundContext.Provider value={makeAvailableGlobally}>
      {children}
    </PlaygroundContext.Provider>
  );
}
