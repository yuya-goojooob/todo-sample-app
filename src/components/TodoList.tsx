import type { FilterType, Todo } from '../types'
import TodoItem from './TodoItem'
import EmptyState from './EmptyState'

interface TodoListProps {
  todos: Todo[]
  filter: FilterType
  search: string
  onToggle: (id: string) => void
  onUpdate: (todo: Todo) => void
  onDelete: (id: string) => void
}

export default function TodoList({ todos, filter, search, onToggle, onUpdate, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return <EmptyState filter={filter} hasSearch={!!search.trim()} />
  }

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
