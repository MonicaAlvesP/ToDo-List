import React, { FormEvent, useContext, useState, useEffect } from 'react';
import s from './styles.module.scss';
import { ShoppingContext } from '../context/TasksContext';

export const ShoppingList: React.FC = () => {
  const [itemTitle, setItemTitle] = useState('');
  const { items, setItems } = useContext(ShoppingContext);

  useEffect(() => {
    const storedItems = localStorage.getItem('shoppingItems');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, [setItems]);

  function handleSubmitAddItem(e: FormEvent) {
    e.preventDefault();

    if (itemTitle.length < 3) {
      alert('O nome do item deve ter no mínimo 3 caracteres');
      return;
    }

    const newItems = [
      ...items,
      {
        title: itemTitle,
        done: false,
        id: new Date().getTime()
      }
    ];
    setItems(newItems);
    localStorage.setItem('shoppingItems', JSON.stringify(newItems));

    setItemTitle('');
  }

  const handleItemCheck = (itemId: number) => {
    const newItems = items.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          done: !item.done
        };
      }
      return item;
    });
    setItems(newItems);
    localStorage.setItem('shoppingItems', JSON.stringify(newItems));
  };

  const handleRemoveItem = (id: number) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    localStorage.setItem('shoppingItems', JSON.stringify(newItems));
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      items.map(item => `${item.title},${item.done ? 'Concluído' : 'Pendente'}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "lista_de_compras.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className={s.taskContainer}>
      <form className={s.form} onSubmit={handleSubmitAddItem}>
        <label htmlFor="item-title">Adicionar Item</label>
        <div className={s.content}>
          <input
            value={itemTitle}
            onChange={(e) => setItemTitle(e.target.value)}
            type="text"
            id="item-title"
            placeholder='Nome do Item'
          />
          <button type='submit'>Adicionar</button>
        </div>
      </form>

      <button onClick={handleExportCSV} className={s.exportButton}>
        Exportar para CSV
      </button>

      <ul className={s.taskList}>
        {items.map(item => (
          <li key={item.id}>
            <input
              type="checkbox"
              name='item'
              id={`item-${item.id}`}
              checked={item.done}
              onChange={() => handleItemCheck(item.id)}
            />
            <label
              htmlFor={`item-${item.id}`}
              className={item.done ? s.done : ""}
            >
              {item.title}
            </label>
            <div className={s.actions}>
              <button onClick={() => handleRemoveItem(item.id)}>Remover</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};