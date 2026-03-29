import React, { useContext } from 'react';
import { StatsCard } from '../statsCard';
import s from './styles.module.scss';
import { ShoppingContext } from '../context/TasksContext';

export const Header: React.FC = () => {
  const { items } = useContext(ShoppingContext);

  const totalItems = items.length;
  const totalAdded = items.reduce((total: number, item: { done: boolean }) => {
    if (!item.done) {
      return total + 1;
    }
    return total;
  }, 0);

  const totalPicked = totalItems - totalAdded;

  return (
    <header className={s.headerTodo}>
      <div className={s.inner}>
        <p className={s.eyebrow}>Organize sua ida ao mercado</p>
        <h1 className={s.title}>Lista de Compras</h1>
        <p className={s.subtitle}>
          Marque o que já pegou, importe uma lista rápida e acompanhe o progresso.
        </p>

        <section className={s.card_content} aria-label="Resumo da lista">
          <StatsCard title="Total de Itens" value={totalItems} />
          <StatsCard title="Adicionados" value={totalAdded} />
          <StatsCard title="Pegos" value={totalPicked} />
        </section>
      </div>
    </header>
  );
};