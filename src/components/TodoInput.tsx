import { useState, useRef } from 'react';
import styles from './TodoInput.module.css';

interface Props {
  onAdd: (text: string) => void;
  onToggleAll: () => void;
  hasItems: boolean;
  allCompleted: boolean;
}

export default function TodoInput({ onAdd, onToggleAll, hasItems, allCompleted }: Props) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onAdd(value);
    setValue('');
    inputRef.current?.focus();
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      {hasItems && (
        <button
          type="button"
          className={`${styles.toggleAll} ${allCompleted ? styles.active : ''}`}
          onClick={onToggleAll}
          title="모두 완료/미완료"
          aria-label="모두 완료 토글"
        >
          ↓
        </button>
      )}
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        placeholder="할 일을 입력하세요..."
        value={value}
        onChange={e => setValue(e.target.value)}
        autoFocus
      />
      <button
        type="submit"
        className={styles.addBtn}
        disabled={!value.trim()}
        aria-label="추가"
      >
        추가
      </button>
    </form>
  );
}
