import { useReducer, useEffect, useMemo } from 'react'
import type { TodoState, TodoAction, Todo } from '../types'

const STORAGE_KEY = 'todo-app-todos'

const PRIORITY_ORDER: Record<string, number> = { high: 0, medium: 1, low: 2 }

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

function loadFromStorage(): Todo[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as Todo[]) : []
  } catch {
    return []
  }
}

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO': {
      const now = new Date().toISOString()
      const newTodo: Todo = {
        id: generateId(),
        createdAt: now,
        updatedAt: now,
        ...action.payload,
      }
      return { ...state, todos: [newTodo, ...state.todos] }
    }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
            : todo
        ),
      }
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, ...action.payload, updatedAt: new Date().toISOString() }
            : todo
        ),
      }
    case 'DELETE_TODO':
      return { ...state, todos: state.todos.filter((todo) => todo.id !== action.payload) }
    case 'DELETE_COMPLETED':
      return { ...state, todos: state.todos.filter((todo) => !todo.completed) }
    case 'SET_FILTER':
      return { ...state, filter: action.payload }
    case 'SET_SORT':
      return { ...state, sort: action.payload }
    case 'SET_SEARCH':
      return { ...state, search: action.payload }
  }
}

export function useTodos() {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: loadFromStorage(),
    filter: 'all',
    sort: 'createdAt',
    search: '',
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos))
  }, [state.todos])

  const filteredTodos = useMemo(() => {
    let result = state.todos

    if (state.filter === 'active') {
      result = result.filter((t) => !t.completed)
    } else if (state.filter === 'completed') {
      result = result.filter((t) => t.completed)
    }

    if (state.search.trim()) {
      const query = state.search.toLowerCase()
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description?.toLowerCase().includes(query)
      )
    }

    result = [...result].sort((a, b) => {
      if (state.sort === 'priority') {
        return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
      }
      if (state.sort === 'dueDate') {
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return a.dueDate.localeCompare(b.dueDate)
      }
      return b.createdAt.localeCompare(a.createdAt)
    })

    return result
  }, [state.todos, state.filter, state.sort, state.search])

  const stats = useMemo(
    () => ({
      total: state.todos.length,
      active: state.todos.filter((t) => !t.completed).length,
      completed: state.todos.filter((t) => t.completed).length,
    }),
    [state.todos]
  )

  return {
    todos: filteredTodos,
    filter: state.filter,
    sort: state.sort,
    search: state.search,
    stats,
    dispatch,
  }
}
