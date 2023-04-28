import { ReactNode, createContext, useState } from "react";

interface GalleryContextProps {
  galleryRoute: string;
  routeSellected: (value: string) => void;
}

export const GalleryContext = createContext<GalleryContextProps>({
  galleryRoute: "",
  routeSellected: function (value: string): void {},
});

export default function GalleryContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [galleryRoute, setGalleryRoute] = useState<string>("");

  const routeSellected = (value: string) => {
    setGalleryRoute(value);
  };

  return (
    <GalleryContext.Provider value={{ galleryRoute, routeSellected }}>
      {children}
    </GalleryContext.Provider>
  );
}
