import { createContext, useEffect, useState } from "react";

export interface ShoppingItemProps {
  title: string;
  done: boolean;
  id: number;
}

interface ShoppingContextData {
  items: ShoppingItemProps[];
  setItems: React.Dispatch<React.SetStateAction<ShoppingItemProps[]>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ShoppingContext = createContext({} as ShoppingContextData);

interface ShoppingProviderProps {
  children: React.ReactNode;
}

export const ShoppingProvider: React.FC<ShoppingProviderProps> = ({ children }) => {
  const [items, setItems] = useState<ShoppingItemProps[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem('shoppingItems');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  return (
    <ShoppingContext.Provider value={{ items, setItems }}>
      {children}
    </ShoppingContext.Provider>
  );
};