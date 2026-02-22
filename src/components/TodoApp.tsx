import type { User } from '@supabase/supabase-js'
import { useTodos } from '../hooks/useTodos'
import Header from './Header'
import SearchBar from './SearchBar'
import FilterBar from './FilterBar'
import TodoForm from './TodoForm'
import TodoList from './TodoList'

interface TodoAppProps {
  user: User
  onSignOut: () => void
}

export default function TodoApp({ user, onSignOut }: TodoAppProps) {
  const { todos, filter, sort, search, stats, dispatch } = useTodos(user.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Header
          total={stats.total}
          active={stats.active}
          completed={stats.completed}
          user={user}
          onSignOut={onSignOut}
        />

        <TodoForm
          compact
          onSubmit={(data) => dispatch({ type: 'ADD_TODO', payload: data })}
        />

        <SearchBar
          value={search}
          onChange={(value) => dispatch({ type: 'SET_SEARCH', payload: value })}
        />

        <FilterBar
          filter={filter}
          sort={sort}
          completedCount={stats.completed}
          onFilterChange={(f) => dispatch({ type: 'SET_FILTER', payload: f })}
          onSortChange={(s) => dispatch({ type: 'SET_SORT', payload: s })}
          onDeleteCompleted={() => dispatch({ type: 'DELETE_COMPLETED' })}
        />

        <TodoList
          todos={todos}
          filter={filter}
          search={search}
          onToggle={(id) => dispatch({ type: 'TOGGLE_TODO', payload: id })}
          onUpdate={(todo) => dispatch({ type: 'UPDATE_TODO', payload: todo })}
          onDelete={(id) => dispatch({ type: 'DELETE_TODO', payload: id })}
        />
      </div>
    </div>
  )
}
