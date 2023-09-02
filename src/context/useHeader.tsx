import { createContext, useContext, useState } from "react";

interface HeaderContextProps {
  isScrolled: number;
  setIsScrolled: React.Dispatch<React.SetStateAction<number>>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  titleColor: string;
  setTitleColor: React.Dispatch<React.SetStateAction<string>>
  isSticky: boolean;
  setIsSticky: React.Dispatch<React.SetStateAction<boolean>>
}

export const HeaderContext = createContext<HeaderContextProps>({
  isScrolled: 0,
  setIsScrolled: () => null,
  isSidebarOpen: true,
  setIsSidebarOpen: () => null,
  titleColor: '#000000',
  setTitleColor: () => null,
  isSticky: true,
  setIsSticky: () => null
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [titleColor, setTitleColor] = useState('#000000')
  const [isSticky, setIsSticky] = useState(true)


  return (
    <HeaderContext.Provider value={{ isScrolled, setIsScrolled, isSidebarOpen, setIsSidebarOpen, titleColor, setTitleColor, isSticky, setIsSticky }}>
      {children}
    </HeaderContext.Provider>
  );
}

export const useHeader = () => useContext(HeaderContext);
