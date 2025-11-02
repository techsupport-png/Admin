import { FC } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Users,
  GraduationCap,
  FileText,
  DollarSign,
  Calendar,
  Award,
} from 'lucide-react'

const Analytics: FC = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$124,350',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'New Applications',
      value: '1,234',
      change: '+23.1%',
      trend: 'up',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Active Students',
      value: '2,543',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
  color: 'text-[#ff6b35]',
  bgColor: 'bg-[#FFF8F0]',
    },
    {
      title: 'Partner Colleges',
      value: '156',
      change: '-2.4%',
      trend: 'down',
      icon: GraduationCap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ]

  const monthlyData = [
    { month: 'Jan', applications: 85, enrollments: 65 },
    { month: 'Feb', applications: 95, enrollments: 72 },
    { month: 'Mar', applications: 110, enrollments: 88 },
    { month: 'Apr', applications: 125, enrollments: 95 },
    { month: 'May', applications: 140, enrollments: 110 },
    { month: 'Jun', applications: 155, enrollments: 125 },
  ]

  const topColleges = [
    { name: 'MIT', applications: 234, acceptanceRate: '68%', revenue: '$45,200' },
    { name: 'Stanford', applications: 198, acceptanceRate: '72%', revenue: '$38,500' },
    { name: 'Harvard', applications: 187, acceptanceRate: '65%', revenue: '$36,800' },
    { name: 'Oxford', applications: 165, acceptanceRate: '70%', revenue: '$32,400' },
    { name: 'Cambridge', applications: 156, acceptanceRate: '69%', revenue: '$30,100' },
  ]

  const recentActivity = [
    { date: 'Today', event: '15 new applications received', icon: FileText },
    { date: 'Yesterday', event: '23 students enrolled', icon: Users },
    { date: '2 days ago', event: 'New partnership with Yale University', icon: GraduationCap },
    { date: '3 days ago', event: '12 applications approved', icon: Award },
  ]

  const maxApplications = Math.max(...monthlyData.map((d) => d.applications))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
        <p className="text-gray-500 dark:text-[#94A3B8] mt-1">Track performance and key metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.title} className="bg-[#F8FAFC] dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-[#94A3B8] mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-[#94A3B8]">vs last month</span>
                  </div>
                </div>
                <div className={`rounded-full p-3 ${stat.bgColor} dark:bg-opacity-20`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Applications Chart */}
        <div className="bg-[#F8FAFC] dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Applications & Enrollments</h3>
              <p className="text-sm text-gray-500 dark:text-[#94A3B8]">Last 6 months trend</p>
            </div>
            <Calendar className="h-5 w-5 text-gray-400 dark:text-[#94A3B8]" />
          </div>
          <div className="space-y-4">
            {monthlyData.map((data) => (
              <div key={data.month}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700 dark:text-[#CBD5E1]">{data.month}</span>
                  <div className="flex gap-4">
                    <span className="text-[#ff6b35] dark:text-orange-400">{data.applications} apps</span>
                    <span className="text-green-600 dark:text-green-400">{data.enrollments} enrolled</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#ff6b35] dark:bg-orange-500 rounded-full"
                      style={{ width: `${(data.applications / maxApplications) * 100}%` }}
                    />
                  </div>
                  <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 dark:bg-green-400 rounded-full"
                      style={{ width: `${(data.enrollments / maxApplications) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Colleges */}
        <div className="bg-[#F8FAFC] dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Performing Colleges</h3>
              <p className="text-sm text-gray-500 dark:text-[#94A3B8]">By application volume</p>
            </div>
            <Award className="h-5 w-5 text-gray-400 dark:text-[#94A3B8]" />
          </div>
          <div className="space-y-4">
            {topColleges.map((college, index) => (
              <div key={college.name} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FFF8F0] dark:bg-orange-900/30 flex items-center justify-center">
                  <span className="text-sm font-bold text-[#ff6b35] dark:text-orange-400">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{college.name}</p>
                  <p className="text-sm text-gray-500 dark:text-[#94A3B8]">{college.applications} applications</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{college.revenue}</p>
                  <p className="text-sm text-green-600 dark:text-green-400">{college.acceptanceRate} accepted</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#F8FAFC] dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => {
            const Icon = activity.icon
            return (
              <div key={index} className="flex items-start gap-4 pb-4 border-b dark:border-gray-700 last:border-b-0">
                <div className="rounded-full bg-orange-50 dark:bg-orange-900/30 p-2">
                  <Icon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.event}</p>
                  <p className="text-sm text-gray-500 dark:text-[#94A3B8]">{activity.date}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
          <h4 className="text-sm font-medium opacity-90 mb-2">Conversion Rate</h4>
          <p className="text-3xl font-bold">68.5%</p>
          <p className="text-sm opacity-80 mt-2">Applications to Enrollments</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <h4 className="text-sm font-medium opacity-90 mb-2">Average Processing Time</h4>
          <p className="text-3xl font-bold">4.2 days</p>
          <p className="text-sm opacity-80 mt-2">Per application</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <h4 className="text-sm font-medium opacity-90 mb-2">Customer Satisfaction</h4>
          <p className="text-3xl font-bold">4.8/5.0</p>
          <p className="text-sm opacity-80 mt-2">Based on 1,234 reviews</p>
        </div>
      </div>
    </div>
  )
}

export default Analytics
