import { useState, useRef, useEffect } from 'react'
import type { User } from '@supabase/supabase-js'

interface UserMenuProps {
  user: User
  onSignOut: () => void
}

export default function UserMenu({ user, onSignOut }: UserMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const avatarUrl = user.user_metadata.avatar_url as string | undefined
  const name = (user.user_metadata.full_name ?? user.user_metadata.user_name ?? user.email) as string

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full hover:ring-2 hover:ring-indigo-300 transition-all"
        title={name}
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="w-9 h-9 rounded-full" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50">
          <div className="px-4 py-2.5 border-b border-slate-100">
            <p className="text-sm font-medium text-slate-800 truncate">{name}</p>
            {user.email && (
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            )}
          </div>
          <button
            onClick={() => {
              setOpen(false)
              onSignOut()
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            ログアウト
          </button>
        </div>
      )}
    </div>
  )
}
