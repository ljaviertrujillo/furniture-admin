import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export enum ThemeColors {
  LIGHT = "light",
  DARK = "dark",
}

export interface PageContextProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  userOptions: boolean;
  setUserOptions: Dispatch<SetStateAction<boolean>>;
  theme: ThemeColors;
  setTheme: Dispatch<SetStateAction<ThemeColors>>;
}

export const PageContext = createContext<PageContextProps>({
  sidebarOpen: false,
  setSidebarOpen: function (): void {},
  userOptions: false,
  setUserOptions: function (): void {},
  theme: ThemeColors.LIGHT,
  setTheme: function (): void {},
});

export default function PageContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userOptions, setUserOptions] = useState(false);
  const [theme, setTheme] = useState(ThemeColors.LIGHT);

  return (
    <PageContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        userOptions,
        setUserOptions,
        theme,
        setTheme,
      }}
    >
      {children}
    </PageContext.Provider>
  );
}
