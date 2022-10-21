import { createContext, useState } from "react";
import { v4 as uuid } from "uuid";

interface PlaygroundContextType {
  folders: any;
  setFolders: any;
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

export default function PlaygroundProvider({ children }: { children: any }) {
  const [folders, setFolders] = useState({
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
  });

  const makeAvailableGlobally: PlaygroundContextType = {
    folders: folders,
    setFolders: setFolders,
  };

  return (
    <PlaygroundContext.Provider value={makeAvailableGlobally}>
      {children}
    </PlaygroundContext.Provider>
  );
}
