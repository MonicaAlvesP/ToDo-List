import { ShoppingProvider } from "./components/context/TasksContext";
import { Header } from "./components/header";
import { ShoppingList } from "./components/tasks";

export default function App() {
  return (
    <ShoppingProvider>
      <Header />
      <ShoppingList />
    </ShoppingProvider>
  );
}