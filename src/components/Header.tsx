interface HeaderProps {
  total: number
  active: number
  completed: number
}

export default function Header({ total, active, completed }: HeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-4xl font-bold text-slate-800 mb-2">TODO</h1>
      {total > 0 && (
        <div className="flex gap-4 text-sm text-slate-500">
          <span>全 {total} 件</span>
          <span className="text-indigo-600 font-medium">未完了 {active} 件</span>
          <span className="text-green-600 font-medium">完了 {completed} 件</span>
        </div>
      )}
    </header>
  )
}
