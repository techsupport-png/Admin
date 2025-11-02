import { FC } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  FileText,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import useAuthStore from '@/store/authStore'

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

interface SidebarProps {
  role?: 'admin' | 'college' | 'franchise' | 'student'
}

const getNavItems = (role: string): NavItem[] => {
  switch (role) {
    case 'admin':
      return [
        { title: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { title: 'Colleges', href: '/admin/colleges', icon: GraduationCap },
        { title: 'Students', href: '/admin/students', icon: Users },
        { title: 'Applications', href: '/admin/applications', icon: FileText },
        { title: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
        { title: 'Settings', href: '/admin/settings', icon: Settings },
      ]
    case 'college':
      return [
        { title: 'Dashboard', href: '/college', icon: LayoutDashboard },
        { title: 'Programs', href: '/college/programs', icon: GraduationCap },
        { title: 'Applications', href: '/college/applications', icon: FileText },
        { title: 'Settings', href: '/college/settings', icon: Settings },
      ]
    case 'franchise':
      return [
        { title: 'Dashboard', href: '/franchise', icon: LayoutDashboard },
        { title: 'Leads', href: '/franchise/leads', icon: Users },
        { title: 'Students', href: '/franchise/students', icon: Users },
        { title: 'Settings', href: '/franchise/settings', icon: Settings },
      ]
    case 'student':
      return [
        { title: 'Dashboard', href: '/student', icon: LayoutDashboard },
        { title: 'Applications', href: '/student/applications', icon: FileText },
        { title: 'Documents', href: '/student/documents', icon: FileText },
        { title: 'Settings', href: '/student/settings', icon: Settings },
      ]
    default:
      return []
  }
}

// Role icon badge replaced by static brand logo above

export const Sidebar: FC<SidebarProps> = ({ role = 'admin' }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout, user } = useAuthStore()
  const navItems = getNavItems(role)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm">
      {/* Logo & Brand */}
      <div className="border-b dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <img
            src="/img/Original_Icon.svg"
            alt="Bridge Bound Academics logo"
            className="h-10 w-10 rounded-lg"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Bridge Bound Academics</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{role} Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href
          return (
            <Link key={item.href} to={item.href}>
              <div
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-[#ff6b35] text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-[#FFF8F0] dark:hover:bg-gray-700 hover:text-[#e85a2a] dark:hover:text-[#ff8c5a]'
                )}
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="border-t dark:border-gray-700 p-4 space-y-3">
        {user && (
          <div className="rounded-lg bg-gray-50 dark:bg-gray-700 px-3 py-2.5">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  )
}
