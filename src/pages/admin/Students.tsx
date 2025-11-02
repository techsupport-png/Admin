import { FC, useState } from 'react'
import { Search, Filter, UserPlus, Mail, Phone, Calendar } from 'lucide-react'

interface Student {
  id: string
  name: string
  email: string
  phone: string
  college: string
  program: string
  status: 'active' | 'inactive' | 'pending'
  enrollmentDate: string
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    college: 'MIT',
    program: 'Computer Science',
    status: 'active',
    enrollmentDate: '2024-09-01',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 234 567 8901',
    college: 'Stanford',
    program: 'Business Administration',
    status: 'active',
    enrollmentDate: '2024-09-01',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.j@example.com',
    phone: '+1 234 567 8902',
    college: 'Harvard',
    program: 'Law',
    status: 'pending',
    enrollmentDate: '2024-10-15',
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    phone: '+1 234 567 8903',
    college: 'Oxford',
    program: 'Medicine',
    status: 'active',
    enrollmentDate: '2024-08-20',
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.b@example.com',
    phone: '+1 234 567 8904',
    college: 'Cambridge',
    program: 'Engineering',
    status: 'inactive',
    enrollmentDate: '2024-07-10',
  },
]

const Students: FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.college.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || student.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Students</h1>
          <p className="text-gray-500 dark:text-[#94A3B8] mt-1">Manage all student records and information</p>
        </div>
        <button className="flex items-center gap-2 bg-[#ff6b35] text-white px-4 py-2.5 rounded-lg hover:bg-[#e85a2a] transition-colors shadow-sm">
          <UserPlus className="h-5 w-5" />
          Add Student
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#F8FAFC] dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-[#94A3B8]">Total Students</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{mockStudents.length}</p>
            </div>
            <div className="rounded-full bg-blue-50 dark:bg-blue-900/30 p-3">
              <UserPlus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-[#F8FAFC] dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-[#94A3B8]">Active Students</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {mockStudents.filter((s) => s.status === 'active').length}
              </p>
            </div>
            <div className="rounded-full bg-green-50 dark:bg-green-900/30 p-3">
              <UserPlus className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-[#F8FAFC] dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-[#94A3B8]">Pending Approval</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {mockStudents.filter((s) => s.status === 'pending').length}
              </p>
            </div>
            <div className="rounded-full bg-yellow-50 dark:bg-yellow-900/30 p-3">
              <UserPlus className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-[#F8FAFC] dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or college..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-[#F8FAFC] dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F1F5F9] dark:bg-gray-700 border-b dark:border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#CBD5E1] uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#CBD5E1] uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#CBD5E1] uppercase tracking-wider">
                  College & Program
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#CBD5E1] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#CBD5E1] uppercase tracking-wider">
                  Enrollment Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-[#CBD5E1] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-[#F1F5F9] dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-[#FFF8F0] dark:bg-orange-900/30 flex items-center justify-center">
                        <span className="text-[#ff6b35] dark:text-orange-400 font-semibold">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{student.name}</div>
                        <div className="text-sm text-gray-500 dark:text-[#94A3B8]">ID: {student.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
                        <Mail className="h-4 w-4 text-gray-400 dark:text-[#94A3B8]" />
                        {student.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-[#94A3B8]">
                        <Phone className="h-4 w-4 text-gray-400 dark:text-[#94A3B8]" />
                        {student.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white font-medium">{student.college}</div>
                    <div className="text-sm text-gray-500 dark:text-[#94A3B8]">{student.program}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        student.status
                      )}`}
                    >
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
                      <Calendar className="h-4 w-4 text-gray-400 dark:text-[#94A3B8]" />
                      {new Date(student.enrollmentDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-[#ff6b35] hover:text-[#e85a2a] font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-[#94A3B8]">No students found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Students
