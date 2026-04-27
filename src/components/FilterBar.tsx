import { Filter } from '../types';
import styles from './FilterBar.module.css';

interface Props {
  filter: Filter;
  onChange: (f: Filter) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

const LABELS: Record<Filter, string> = {
  all: '전체',
  active: '미완료',
  completed: '완료',
};

export default function FilterBar({ filter, onChange, activeCount, completedCount, onClearCompleted }: Props) {
  return (
    <div className={styles.bar}>
      <span className={styles.count}>
        <strong>{activeCount}</strong>개 남음
      </span>

      <div className={styles.filters}>
        {(['all', 'active', 'completed'] as Filter[]).map(f => (
          <button
            key={f}
            className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
            onClick={() => onChange(f)}
          >
            {LABELS[f]}
          </button>
        ))}
      </div>

      <button
        className={styles.clearBtn}
        onClick={onClearCompleted}
        disabled={completedCount === 0}
      >
        완료 삭제
      </button>
    </div>
  );
}
