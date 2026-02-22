import { useState } from 'react'
import type { Priority, Todo } from '../types'

interface TodoFormProps {
  onSubmit: (data: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => void
  initialValues?: Todo
  onCancel?: () => void
  compact?: boolean
}

const PRIORITY_OPTIONS: { value: Priority; label: string; color: string }[] = [
  { value: 'high', label: '高', color: 'text-red-600' },
  { value: 'medium', label: '中', color: 'text-amber-600' },
  { value: 'low', label: '低', color: 'text-sky-600' },
]

export default function TodoForm({ onSubmit, initialValues, onCancel, compact = false }: TodoFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? '')
  const [description, setDescription] = useState(initialValues?.description ?? '')
  const [priority, setPriority] = useState<Priority>(initialValues?.priority ?? 'medium')
  const [dueDate, setDueDate] = useState(initialValues?.dueDate ?? '')
  const [expanded, setExpanded] = useState(!compact)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      completed: initialValues?.completed ?? false,
      priority,
      dueDate: dueDate || undefined,
    })

    if (!initialValues) {
      setTitle('')
      setDescription('')
      setPriority('medium')
      setDueDate('')
      if (compact) setExpanded(false)
    }
  }

  if (compact && !expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="w-full flex items-center gap-3 px-4 py-3.5 bg-white border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:border-indigo-300 hover:text-indigo-400 transition-colors mb-6 group"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span className="text-sm font-medium">タスクを追加</span>
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm mb-6 overflow-hidden">
      <div className="p-4">
        <input
          type="text"
          placeholder="タスクのタイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          className="w-full text-slate-800 placeholder-slate-400 font-medium text-base focus:outline-none"
        />
        <textarea
          placeholder="詳細（任意）"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full mt-2 text-slate-600 placeholder-slate-400 text-sm focus:outline-none resize-none"
        />
      </div>

      <div className="px-4 pb-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1">
          <span className="text-xs text-slate-500 mr-1">優先度:</span>
          {PRIORITY_OPTIONS.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setPriority(p.value)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                priority === p.value
                  ? `${p.color} border-current bg-current/5`
                  : 'text-slate-400 border-slate-200 hover:border-slate-300'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="text-xs text-slate-600 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="ml-auto flex gap-2">
          {(compact || onCancel) && (
            <button
              type="button"
              onClick={() => {
                if (onCancel) onCancel()
                else {
                  setTitle('')
                  setDescription('')
                  setPriority('medium')
                  setDueDate('')
                  setExpanded(false)
                }
              }}
              className="px-3 py-1.5 text-sm text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            >
              キャンセル
            </button>
          )}
          <button
            type="submit"
            disabled={!title.trim()}
            className="px-4 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {initialValues ? '更新' : '追加'}
          </button>
        </div>
      </div>
    </form>
  )
}
