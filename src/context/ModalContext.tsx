import { createContext, useState } from "react";

interface PopupFields {
  value: boolean; //to open pop up or not
  type: string; //type of pop up
  identifier: {
    folderId: string; //selected folder
    cardId: string; //selected card
  };
}

interface ModalContextType {
  isOpen: PopupFields;
  setIsOpen: (isOpen: PopupFields) => void;
}

export const ModalContext = createContext<ModalContextType | null>(null);

export default function ModalProvider({ children }: { children: any }) {
  const initialPopupFieldsL: PopupFields = {
    value: false,
    type: "",
    identifier: {
      folderId: "",
      cardId: "",
    },
  };
  const [isOpen, setIsOpen] = useState<PopupFields>({ ...initialPopupFieldsL });

  const makeAvailableGlobally: ModalContextType = {
    isOpen: isOpen,
    setIsOpen: setIsOpen,
  };

  return (
    <ModalContext.Provider value={makeAvailableGlobally}>
      {children}
    </ModalContext.Provider>
  );
}
