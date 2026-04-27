import { useState, useRef, useEffect } from 'react';
import { Todo } from '../types';
import styles from './TodoItem.module.css';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      editRef.current?.focus();
      editRef.current?.select();
    }
  }, [editing]);

  function startEdit() {
    setDraft(todo.text);
    setEditing(true);
  }

  function commitEdit() {
    onEdit(todo.id, draft);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') commitEdit();
    if (e.key === 'Escape') {
      setDraft(todo.text);
      setEditing(false);
    }
  }

  return (
    <li className={`${styles.item} ${todo.completed ? styles.done : ''}`}>
      <button
        className={`${styles.checkbox} ${todo.completed ? styles.checked : ''}`}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? '완료 취소' : '완료'}
        aria-pressed={todo.completed}
      >
        {todo.completed && (
          <svg viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {editing ? (
        <input
          ref={editRef}
          className={styles.editInput}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span
          className={styles.text}
          onDoubleClick={startEdit}
          title="더블클릭하여 편집"
        >
          {todo.text}
        </span>
      )}

      <div className={styles.actions}>
        {!editing && (
          <button className={styles.editBtn} onClick={startEdit} aria-label="편집">
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.5 2.5l2 2L5 13H3v-2L11.5 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        <button className={styles.deleteBtn} onClick={() => onDelete(todo.id)} aria-label="삭제">
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 4h10M6 4V3h4v1M5 4v8h6V4H5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </li>
  );
}
