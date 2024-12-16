import { createContext, useEffect, useState } from "react";

export interface TaskProps {
  title: string;
  done: boolean;
  id: number;
}

interface TasksContextData {
  tasks: TaskProps[]
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>
}

// eslint-disable-next-line react-refresh/only-export-components
export const TasksContext = createContext({} as TasksContextData);

interface TasksProviderProps {
  children: React.ReactNode; // ReactNode é um tipo de dado que aceita qualquer coisa que o React possa renderizar
}

export const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {

  const [tasks, setTasks] = useState<TaskProps[]>([]);

  useEffect(() => {
    const storagedTasks = localStorage.getItem('tasks');
    if (storagedTasks) {
      setTasks(JSON.parse(storagedTasks));
    }
  }, []);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
}; 