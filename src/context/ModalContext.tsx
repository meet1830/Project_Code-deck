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
  openModal: (value: PopupFields) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | null>(null);

export default function ModalProvider({ children }: { children: any }) {
  const initialPopupFields: PopupFields = {
    value: false,
    type: "",
    identifier: {
      folderId: "",
      cardId: "",
    },
  };
  const [isOpen, setIsOpen] = useState<PopupFields>({ ...initialPopupFields });

  const openModal = (value: PopupFields) => {
    setIsOpen(value);
  };

  const closeModal = () => {
    setIsOpen({ ...initialPopupFields });
  };

  // increasing readability of code by making two functions for two features openmoal and closemodal
  const makeAvailableGlobally: ModalContextType = {
    isOpen: isOpen,
    openModal: openModal,
    closeModal: closeModal,
  };

  return (
    <ModalContext.Provider value={makeAvailableGlobally}>
      {children}
    </ModalContext.Provider>
  );
}
