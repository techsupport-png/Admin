import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/shared/Sidebar'

const AdminLayout: FC = () => {
  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-gray-900">
      <Sidebar role="admin" />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6 max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout
