import { useState } from 'react'
import type { Todo } from '../types'
import TodoForm from './TodoForm'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onUpdate: (todo: Todo) => void
  onDelete: (id: string) => void
}

const PRIORITY_STYLES = {
  high: { badge: 'bg-red-100 text-red-700', dot: 'bg-red-500', label: '高' },
  medium: { badge: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500', label: '中' },
  low: { badge: 'bg-sky-100 text-sky-700', dot: 'bg-sky-500', label: '低' },
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })
}

function isOverdue(dateStr: string): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(dateStr + 'T00:00:00')
  return due < today
}

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [editing, setEditing] = useState(false)

  if (editing) {
    return (
      <div className="mb-2">
        <TodoForm
          initialValues={todo}
          onSubmit={(data) => {
            onUpdate({ ...todo, ...data })
            setEditing(false)
          }}
          onCancel={() => setEditing(false)}
        />
      </div>
    )
  }

  const priority = PRIORITY_STYLES[todo.priority]
  const overdue = todo.dueDate && !todo.completed && isOverdue(todo.dueDate)

  return (
    <div
      className={`group flex items-start gap-3 px-4 py-3.5 bg-white rounded-xl border transition-all hover:shadow-sm ${
        todo.completed ? 'border-slate-100 opacity-60' : 'border-slate-200'
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
          todo.completed
            ? 'bg-green-500 border-green-500'
            : 'border-slate-300 hover:border-indigo-400'
        }`}
      >
        {todo.completed && (
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 flex-wrap">
          <span
            className={`text-sm font-medium leading-relaxed ${
              todo.completed ? 'line-through text-slate-400' : 'text-slate-800'
            }`}
          >
            {todo.title}
          </span>
          <span className={`flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${priority.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
            {priority.label}
          </span>
        </div>

        {todo.description && (
          <p className="mt-1 text-xs text-slate-500 line-clamp-2">{todo.description}</p>
        )}

        {todo.dueDate && (
          <div className={`mt-1.5 flex items-center gap-1 text-xs ${overdue ? 'text-red-500' : 'text-slate-400'}`}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {overdue ? '期限切れ: ' : ''}{formatDate(todo.dueDate)}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <button
          onClick={() => setEditing(true)}
          title="編集"
          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          title="削除"
          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}
