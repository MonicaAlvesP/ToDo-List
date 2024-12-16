import { TasksProvider } from "./components/context/TasksContext";
import { Header } from "./components/header";
import { Tasks } from "./components/tasks";

export default function App() {
  return (
    <TasksProvider>
      <Header />
      <Tasks />
    </TasksProvider>
  )
}