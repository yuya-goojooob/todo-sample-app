import type { FilterType, SortType } from '../types'

interface FilterBarProps {
  filter: FilterType
  sort: SortType
  completedCount: number
  onFilterChange: (filter: FilterType) => void
  onSortChange: (sort: SortType) => void
  onDeleteCompleted: () => void
}

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: '全て' },
  { value: 'active', label: '未完了' },
  { value: 'completed', label: '完了' },
]

const SORTS: { value: SortType; label: string }[] = [
  { value: 'createdAt', label: '作成日' },
  { value: 'priority', label: '優先度' },
  { value: 'dueDate', label: '期限日' },
]

export default function FilterBar({
  filter,
  sort,
  completedCount,
  onFilterChange,
  onSortChange,
  onDeleteCompleted,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-4">
      <div className="flex bg-slate-100 rounded-lg p-1 gap-1">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filter === f.value
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <span className="text-sm text-slate-500">並び替え:</span>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortType)}
          className="text-sm border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        {completedCount > 0 && (
          <button
            onClick={onDeleteCompleted}
            className="text-sm text-red-500 hover:text-red-700 px-2 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
          >
            完了を削除
          </button>
        )}
      </div>
    </div>
  )
}
