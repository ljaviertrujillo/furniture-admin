import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router-dom";

interface webContextProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isFormVisible: boolean;
  setIsFormVisible: Dispatch<SetStateAction<boolean>>;
}

export const WebContext = createContext<webContextProps>({
  isOpen: true,
  setIsOpen: function (): void {},
  isFormVisible: false,
  setIsFormVisible: function (): void {},
});

export default function WebContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const location = useLocation();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsFormVisible(false);
    setIsOpen(true)
  }, [location]);

  return (
    <WebContext.Provider
      value={{ isOpen, setIsOpen, isFormVisible, setIsFormVisible,}}
    >
      {children}
    </WebContext.Provider>
  );
}
