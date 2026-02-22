export interface Todo {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: Priority
  dueDate?: string
  createdAt: string
  updatedAt: string
}

export type Priority = 'high' | 'medium' | 'low'
export type FilterType = 'all' | 'active' | 'completed'
export type SortType = 'createdAt' | 'dueDate' | 'priority'

export type TodoAction =
  | { type: 'ADD_TODO'; payload: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'> }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'UPDATE_TODO'; payload: { id: string } & Partial<Omit<Todo, 'id' | 'createdAt'>> }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'DELETE_COMPLETED' }
  | { type: 'SET_FILTER'; payload: FilterType }
  | { type: 'SET_SORT'; payload: SortType }
  | { type: 'SET_SEARCH'; payload: string }

export interface TodoState {
  todos: Todo[]
  filter: FilterType
  sort: SortType
  search: string
}
