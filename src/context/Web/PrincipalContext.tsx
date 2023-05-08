import { ReactNode, createContext } from "react";
import { useDispatch } from "react-redux";
import {
  createPrincipal,
  resetPrincipal,
  updatePrincipal,
} from "../../redux/states/principal";
import { Principal } from "../../models/principal.model";

interface PrincipalContextProps {
  newPrincipal: (principal: Principal) => void;
  updatedPrincipal: (principal: Principal) => void;
  removePrincipal: () => void;
}

export const PrincipalContext = createContext<PrincipalContextProps>({
  newPrincipal: function (principal: Principal): void {},
  updatedPrincipal: function (principal: Principal): void {},
  removePrincipal: function (): void {},
});

export default function PrincipalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const dispatch = useDispatch();

  const newPrincipal = (principal: Principal) => {
    dispatch(createPrincipal(principal));
  };

  const updatedPrincipal = (principal: Principal) => {
    dispatch(updatePrincipal(principal));
  };

  const removePrincipal = () => {
    dispatch(resetPrincipal());
  };

  return (
    <PrincipalContext.Provider
      value={{ newPrincipal, updatedPrincipal, removePrincipal }}
    >
      {children}
    </PrincipalContext.Provider>
  );
}
