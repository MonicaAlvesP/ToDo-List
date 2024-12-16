import React, { useContext, useState, useEffect } from 'react';
import { StatsCard } from '../statsCard';
import s from './styles.module.scss';
import { TasksContext } from '../context/TasksContext';

export const Header: React.FC = () => {
  const { tasks } = useContext(TasksContext);
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('userName') || 'Mônica';
  });

  useEffect(() => {
    localStorage.setItem('userName', userName);
  }, [userName]);

  const totalTasks = tasks.length;
  const totalPending = tasks.reduce((total: number, task: { done: boolean }) => {
    if (!task.done) {
      return total + 1;
    }
    return total;
  }, 0);

  const totalCompleted = totalTasks - totalPending;

  const handleNameChange = () => {
    const name = prompt('Por favor, insira seu nome:');
    if (name) {
      setUserName(name);
    }
  };

  return (
    <header className={s.headerTodo}>
      <div className={s.container}>
        <h1 className={s.title}>Lista de Tarefas</h1>
        <span className={s.welcome}>Bem Vinda(o), {userName}!</span>
        <button
          onClick={handleNameChange}
          className={s.buttonNameChange}
        >Mudar Nome</button>
      </div>

      <section className={s.card_content}>
        <StatsCard
          title="Total de Tarefas"
          value={totalTasks}
        />
        <StatsCard
          title="Pendentes"
          value={totalPending}
        />
        <StatsCard
          title="Concluídas"
          value={totalCompleted}
        />
      </section>
    </header>
  );
};