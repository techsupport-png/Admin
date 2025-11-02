import { FC, useState } from 'react'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  Camera,
} from 'lucide-react'
import useAuthStore from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'

const Settings: FC = () => {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'preferences'>(
    'profile'
  )
  const { mode, setMode } = useThemeStore()

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Palette },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-[#94A3B8] mt-1">Manage your account settings and preferences</p>
      </div>

      {/* Tabs */}
      <div className="bg-[#F8FAFC] dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow-sm">
        <div className="border-b dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 dark:text-[#94A3B8] hover:text-gray-700 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-3xl font-bold text-orange-600">
                      {user?.name?.charAt(0) || 'A'}
                    </span>
                  </div>
                  <button className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 shadow-lg">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{user?.name || 'Admin User'}</h3>
                  <p className="text-sm text-gray-500 dark:text-[#94A3B8]">{user?.email || 'admin@bridgebound.com'}</p>
                  <button className="mt-2 text-sm text-orange-600 hover:text-orange-700 font-medium">
                    Change Profile Picture
                  </button>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-[#CBD5E1] mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      defaultValue={user?.name || 'Admin User'}
                      className="w-full pl-10 pr-4 py-2.5 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-[#CBD5E1] mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      defaultValue={user?.email || 'admin@bridgebound.com'}
                      className="w-full pl-10 pr-4 py-2.5 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-[#CBD5E1] mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      defaultValue="+1 234 567 8900"
                      className="w-full pl-10 pr-4 py-2.5 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-[#CBD5E1] mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      defaultValue="New York, USA"
                      className="w-full pl-10 pr-4 py-2.5 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-[#CBD5E1] mb-2">
                    Organization
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      defaultValue="Bridge Bound Academics"
                      className="w-full pl-10 pr-4 py-2.5 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="flex items-center gap-2 bg-orange-500 text-white px-6 py-2.5 rounded-lg hover:bg-orange-600 transition-colors shadow-sm">
                  <Save className="h-5 w-5" />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  {[
                    { label: 'New Applications', description: 'Get notified when students submit applications' },
                    { label: 'Application Status Updates', description: 'Updates on application approvals and rejections' },
                    { label: 'New Student Enrollments', description: 'Notifications for new student registrations' },
                    { label: 'System Updates', description: 'Important system maintenance and updates' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-3 border-b dark:border-gray-700">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                        <p className="text-sm text-gray-500 dark:text-[#94A3B8]">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Push Notifications</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Desktop Notifications', description: 'Show notifications on your desktop' },
                    { label: 'Mobile Push', description: 'Receive push notifications on mobile devices' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-3 border-b dark:border-gray-700">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                        <p className="text-sm text-gray-500 dark:text-[#94A3B8]">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Change Password</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-[#CBD5E1] mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2.5 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-[#CBD5E1] mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2.5 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-[#CBD5E1] mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2.5 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <button className="bg-orange-500 text-white px-6 py-2.5 rounded-lg hover:bg-orange-600 transition-colors">
                    Update Password
                  </button>
                </div>
              </div>

              <div className="border-t dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600 dark:text-[#94A3B8] mb-4">
                  Add an extra layer of security to your account
                </p>
                <button className="border border-orange-500 text-orange-600 px-6 py-2.5 rounded-lg hover:bg-orange-50 transition-colors">
                  Enable 2FA
                </button>
              </div>

              <div className="border-t dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Sessions</h3>
                <div className="space-y-3">
                  {[
                    { device: 'Chrome on Windows', location: 'New York, USA', time: 'Current session' },
                    { device: 'Safari on iPhone', location: 'Boston, USA', time: '2 hours ago' },
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{session.device}</p>
                        <p className="text-sm text-gray-500 dark:text-[#94A3B8]">{session.location} • {session.time}</p>
                      </div>
                      {index !== 0 && (
                        <button className="text-red-600 text-sm font-medium hover:text-red-700">
                          Revoke
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h3>
                <div className="grid grid-cols-3 gap-4 max-w-md">
                  {[
                    { id: 'light' as const, label: 'Light' },
                    { id: 'dark' as const, label: 'Dark' },
                    { id: 'system' as const, label: 'System' },
                  ].map((opt) => {
                    const active = mode === opt.id
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setMode(opt.id)}
                        className={
                          `rounded-lg p-4 transition-colors border-2 ` +
                          (active
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 dark:border-gray-600 hover:bg-[#F1F5F9] dark:hover:bg-gray-700')
                        }
                      >
                        <div className="text-center">
                          <p className={active ? 'font-semibold text-orange-700' : 'font-medium text-gray-900 dark:text-white'}>
                            {opt.label}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
                <p className="text-xs text-gray-500 dark:text-[#94A3B8] mt-2">System follows your device preference and updates automatically.</p>
              </div>

              <div className="border-t dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Language & Region</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-[#CBD5E1] mb-2">
                      Language
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select className="w-full pl-10 pr-4 py-2.5 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white">
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-[#CBD5E1] mb-2">
                      Time Zone
                    </label>
                    <select className="w-full px-4 py-2.5 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white">
                      <option>Eastern Time (ET)</option>
                      <option>Pacific Time (PT)</option>
                      <option>Central Time (CT)</option>
                      <option>Mountain Time (MT)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data & Privacy</h3>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 border dark:border-gray-700 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-gray-700 transition-colors">
                    <p className="font-medium text-gray-900 dark:text-white">Download Your Data</p>
                    <p className="text-sm text-gray-500 dark:text-[#94A3B8]">Get a copy of your account data</p>
                  </button>
                  <button className="w-full text-left px-4 py-3 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                    <p className="font-medium text-red-600">Delete Account</p>
                    <p className="text-sm text-gray-500 dark:text-[#94A3B8]">Permanently delete your account and data</p>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings
