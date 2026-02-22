import { useAuth } from './hooks/useAuth'
import LoginPage from './components/LoginPage'
import TodoApp from './components/TodoApp'

export default function App() {
  const { user, loading, signInWithGitHub, signOut } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <LoginPage onLogin={signInWithGitHub} />
  }

  return <TodoApp user={user} onSignOut={signOut} />
}
