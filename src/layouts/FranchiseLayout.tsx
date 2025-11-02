import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/shared/Sidebar'

const FranchiseLayout: FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="franchise" />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6 max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default FranchiseLayout
