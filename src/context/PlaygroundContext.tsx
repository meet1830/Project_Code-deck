import { createContext, useState } from "react";

interface PlaygroundContextType {
  folders: any;
  setFolders: any;
}

export const PlaygroundContext = createContext<PlaygroundContextType | null>(
  null
);

export default function PlaygroundProvider({ children }: { children: any }) {
  const [folders, setFolders] = useState({
    ["1"]: {
      title: "Folder Title 1",
      items: {
        ["item1"]: {
          title: "Stack Implementation",
          language: "Cpp",
        },
        ["item2"]: {
          title: "Queue Implementation",
          language: "Cpp",
        },
        ["item3"]: {
          title: "Dequeue Implementation",
          language: "Cpp",
        },
      },
    },
    ["2"]: {
      title: "Folder Title 2",
      items: {
        ["item1"]: {
          title: "Stack Implementation",
          language: "Cpp",
        },
        ["item2"]: {
          title: "Queue Implementation",
          language: "Cpp",
        },
        ["item3"]: {
          title: "Dequeue Implementation",
          language: "Cpp",
        },
      },
    },
  });

  const makeAvailableGlobally: PlaygroundContextType = {
    folders: folders,
    setFolders: setFolders
  };

  return (
    <PlaygroundContext.Provider value={makeAvailableGlobally}>
      {children}
    </PlaygroundContext.Provider>
  );
}
