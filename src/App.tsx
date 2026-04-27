import { useState } from 'react';
import { Filter } from './types';
import { useTodos } from './hooks/useTodos';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import FilterBar from './components/FilterBar';
import styles from './App.module.css';

export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted, toggleAll } = useTodos();
  const [filter, setFilter] = useState<Filter>('all');

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.filter(t => t.completed).length;
  const allCompleted = todos.length > 0 && todos.every(t => t.completed);

  const visible = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Todo</h1>
          <p className={styles.subtitle}>오늘 할 일을 관리하세요</p>
        </header>

        <main className={styles.card}>
          <TodoInput
            onAdd={addTodo}
            onToggleAll={toggleAll}
            hasItems={todos.length > 0}
            allCompleted={allCompleted}
          />

          {visible.length > 0 ? (
            <ul className={styles.list}>
              {visible.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))}
            </ul>
          ) : (
            <div className={styles.empty}>
              {todos.length === 0 ? (
                <>
                  <span className={styles.emptyIcon}>✓</span>
                  <p>할 일을 추가해보세요</p>
                </>
              ) : (
                <>
                  <span className={styles.emptyIcon}>🎉</span>
                  <p>해당 항목이 없습니다</p>
                </>
              )}
            </div>
          )}

          {todos.length > 0 && (
            <FilterBar
              filter={filter}
              onChange={setFilter}
              activeCount={activeCount}
              completedCount={completedCount}
              onClearCompleted={clearCompleted}
            />
          )}
        </main>

        <footer className={styles.footer}>
          더블클릭하여 편집 · Enter로 저장 · Esc로 취소
        </footer>
      </div>
    </div>
  );
}
