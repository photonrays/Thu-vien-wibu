import { createContext, useContext, useState } from "react";

interface ThemeContextProps {
  isScrolled: boolean;
  setIsScrolled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThemeContext = createContext<ThemeContextProps>({
  isScrolled: false,
  setIsScrolled: () => null,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <ThemeContext.Provider value={{ isScrolled, setIsScrolled }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
