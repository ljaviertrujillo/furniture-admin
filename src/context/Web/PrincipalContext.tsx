import { ReactNode, createContext } from "react";
import { useDispatch } from "react-redux";
import { createPrincipal, updatePrincipal } from "../../redux/states/principal";
import { IPrincipal } from "../../models/principal.model";

interface PrincipalContextProps {
  newPrincipal: (principal: IPrincipal) => void;
  updatedPrincipal: (principal: IPrincipal) => void;
}

export const PrincipalContext = createContext<PrincipalContextProps>({
  newPrincipal: function (principal: IPrincipal): void {},
  updatedPrincipal: function (principal: IPrincipal): void {},
});

export default function PrincipalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const dispatch = useDispatch();

  const newPrincipal = (principal: IPrincipal) => {
    dispatch(createPrincipal(principal));
  };

  const updatedPrincipal = (principal: IPrincipal) => {
    dispatch(updatePrincipal(principal));
  };

  return (
    <PrincipalContext.Provider value={{ newPrincipal, updatedPrincipal }}>
      {children}
    </PrincipalContext.Provider>
  );
}
