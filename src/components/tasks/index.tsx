import React, { FormEvent, useContext, useState, useEffect, useRef } from 'react';
import s from './styles.module.scss';
import { ShoppingContext } from '../context/TasksContext';
import { parseShoppingCsv } from '../../utils/csv';
import { exportShoppingListPdf } from '../../utils/shoppingListPdf';

export const ShoppingList: React.FC = () => {
  const [itemTitle, setItemTitle] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
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
        id: new Date().getTime(),
      },
    ];
    setItems(newItems);
    localStorage.setItem('shoppingItems', JSON.stringify(newItems));

    setItemTitle('');
  }

  const handleItemCheck = (itemId: number) => {
    const newItems = items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          done: !item.done,
        };
      }
      return item;
    });
    setItems(newItems);
    localStorage.setItem('shoppingItems', JSON.stringify(newItems));
  };

  const handleRemoveItem = (id: number) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    localStorage.setItem('shoppingItems', JSON.stringify(newItems));
  };

  const handleExportPDF = () => {
    exportShoppingListPdf(
      items.map((item) => ({ title: item.title, done: item.done }))
    );
  };

  const handleCsvFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === 'string' ? reader.result : '';
      const parsed = parseShoppingCsv(text);
      if (parsed.length === 0) {
        alert('Nenhum item válido encontrado no CSV.');
        e.target.value = '';
        return;
      }

      const base = Date.now();
      const newItems = parsed.map((p, idx) => ({
        ...p,
        id: base + idx,
      }));

      const updatedItems = [...items, ...newItems];
      setItems(updatedItems);
      localStorage.setItem('shoppingItems', JSON.stringify(updatedItems));
      e.target.value = '';
    };
    reader.onerror = () => {
      alert('Não foi possível ler o arquivo.');
      e.target.value = '';
    };
    reader.readAsText(file, 'UTF-8');
  };

  const triggerCsvPicker = () => fileInputRef.current?.click();

  return (
    <section className={s.taskContainer}>
      <form className={s.form} onSubmit={handleSubmitAddItem}>
        <label htmlFor="item-title">Adicionar item</label>
        <div className={s.content}>
          <input
            value={itemTitle}
            onChange={(e) => setItemTitle(e.target.value)}
            type="text"
            id="item-title"
            placeholder="Nome do Item"
          />
          <button type="submit">Adicionar</button>
        </div>
      </form>

      <div className={s.divider} aria-hidden />

      <div className={s.importSection}>
        <label htmlFor="csv-file-input">Importar CSV</label>
        <p className={s.importHint}>
          Arquivo .csv: uma coluna com o nome do item, ou duas colunas (item e status:
          Pendente / Concluido).
        </p>
        <input
          ref={fileInputRef}
          id="csv-file-input"
          type="file"
          accept=".csv,text/csv"
          className={s.hiddenFileInput}
          onChange={handleCsvFile}
        />
        <div className={s.importRow}>
          <button type="button" onClick={triggerCsvPicker} className={s.importButton}>
            Selecionar arquivo .csv
          </button>
        </div>
      </div>

      <div className={s.listHeader}>
        <span className={s.listTitle}>Itens</span>
        {items.length > 0 && (
          <span className={s.listMeta}>
            {items.filter((i) => i.done).length} de {items.length} pegos
          </span>
        )}
      </div>

      {items.length === 0 ? (
        <div className={s.emptyState}>
          <p>
            <strong>Nenhum item ainda</strong>
            Adicione acima ou importe um CSV para começar.
          </p>
        </div>
      ) : (
        <ul className={s.taskList}>
          {items.map((item) => (
            <li key={item.id} className={item.done ? s.checked : ''}>
              <input
                type="checkbox"
                name="item"
                id={`item-${item.id}`}
                checked={item.done}
                onChange={() => handleItemCheck(item.id)}
              />
              <label
                htmlFor={`item-${item.id}`}
                className={item.done ? s.done : ''}
              >
                {item.title}
              </label>
              <div className={s.actions}>
                <button type="button" onClick={() => handleRemoveItem(item.id)}>
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className={s.footerActions}>
        <button
          type="button"
          onClick={handleExportPDF}
          className={s.exportButton}
          disabled={items.length === 0}
        >
          Exportar PDF
        </button>
      </div>
    </section>
  );
};
