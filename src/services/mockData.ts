import { College, Program, Application, User } from '@/types'

// Mock users for testing login
export const mockUsers = [
  {
    id: '1',
    email: 'admin@test.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const,
  },
  {
    id: '2',
    email: 'college@test.com',
    password: 'college123',
    name: 'College Manager',
    role: 'college' as const,
  },
  {
    id: '3',
    email: 'franchise@test.com',
    password: 'franchise123',
    name: 'Franchise Owner',
    role: 'franchise' as const,
  },
  {
    id: '4',
    email: 'student@test.com',
    password: 'student123',
    name: 'Student User',
    role: 'student' as const,
  },
]

// Mock login function
export function mockLogin(email: string, password: string): Promise<{ user: User; token: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find((u) => u.email === email && u.password === password)

      if (user) {
        // Remove password from response
        const { password: _, ...userWithoutPassword } = user
        resolve({
          user: userWithoutPassword as User,
          token: `mock-token-${user.id}-${Date.now()}`,
        })
      } else {
        reject({ message: 'Invalid email or password' })
      }
    }, 500) // Simulate network delay
  })
}

const samplePrograms: Program[] = [
  { id: 'p1', name: 'BSc Computer Science', description: 'CS program', duration: '3 years', fees: 5000 },
  { id: 'p2', name: 'BA Economics', description: 'Economics program', duration: '3 years', fees: 4000 },
]

const sampleColleges: College[] = [
  {
    id: 'c1',
    name: 'New York University',
    subdomain: 'nyu',
    website: 'https://nyu.bridgebound.com',
    location: 'New York, USA',
    programs: samplePrograms,
  },
  {
    id: 'c2',
    name: 'University of Melbourne',
    subdomain: 'melbourne',
    website: 'https://melbourne.bridgebound.com',
    location: 'Melbourne, Australia',
    programs: [samplePrograms[0]],
  },
  {
    id: 'c3',
    name: 'IIT Delhi',
    subdomain: 'iitd',
    website: 'https://iitd.bridgebound.com',
    location: 'New Delhi, India',
    programs: [samplePrograms[1]],
  },
]

const sampleApplications: Application[] = [
  {
    id: 'a1',
    studentId: 's1',
    collegeId: 'c1',
    programId: 'p1',
    status: 'pending',
    submittedAt: new Date().toISOString(),
    documents: [],
  },
  {
    id: 'a2',
    studentId: 's2',
    collegeId: 'c2',
    programId: 'p1',
    status: 'shortlisted',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    documents: [],
  },
  {
    id: 'a3',
    studentId: 's3',
    collegeId: 'c3',
    programId: 'p2',
    status: 'rejected',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    documents: [],
  },
]

export function getColleges(): Promise<College[]> {
  return new Promise((resolve) => setTimeout(() => resolve(sampleColleges), 400))
}

export function getApplications(): Promise<Application[]> {
  return new Promise((resolve) => setTimeout(() => resolve(sampleApplications), 400))
}
