import { ShoppingProvider } from "./components/context/TasksContext";
import { Header } from "./components/header";
import { ShoppingList } from "./components/tasks";

export default function App() {
  return (
    <ShoppingProvider>
      <div className="app-layout">
        <Header />
        <main className="app-main">
          <ShoppingList />
        </main>
      </div>
    </ShoppingProvider>
  );
}