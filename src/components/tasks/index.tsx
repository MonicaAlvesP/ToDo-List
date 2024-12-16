import React, { FormEvent, useContext, useState, useEffect } from 'react';
import s from './styles.module.scss';
import { TasksContext } from '../context/TasksContext';

export const Tasks: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const { tasks, setTasks } = useContext(TasksContext);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, [setTasks]);

  function handleSubmitAddTask(e: FormEvent) {
    e.preventDefault();

    if (taskTitle.length < 3) {
      alert('O título da tarefa deve ter no mínimo 3 caracteres');
      return;
    }

    const newTasks = [
      ...tasks,
      {
        title: taskTitle,
        done: false,
        id: new Date().getTime()
      }
    ];
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));

    setTaskTitle('');
  }

  const handleTaskCheck = (taskId: number) => {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          done: !task.done
        };
      }
      return task;
    });
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const handleRemoveTask = (id: number) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  return (
    <section className={s.taskContainer}>
      <form className={s.form} onSubmit={handleSubmitAddTask}>
        <label htmlFor="task-title">Adicionar Tarefa</label>
        <div className={s.content}>
          <input
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            type="text"
            id="task-title"
            placeholder='Titulo da Tarefa'
          />
          <button type='submit'>adicionar</button>
        </div>
      </form>

      <ul className={s.taskList}>
        {tasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              name='task'
              id={`task-${task.id}`}
              checked={task.done}
              onChange={() => handleTaskCheck(task.id)}
            />
            <label
              htmlFor={`task-${task.id}`}
              className={task.done ? s.done : ""}
            >
              {task.title}
            </label>
            <div className={s.info}>
              <span>{new Date(task.id).toLocaleDateString()}</span>
              <span>{new Date(task.id).toLocaleTimeString()}</span>
            </div>
            <div className={s.actions}>
              <button onClick={() => handleRemoveTask(task.id)}>remover</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};