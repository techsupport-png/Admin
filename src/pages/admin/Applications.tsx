import React, { useState, useMemo, useEffect } from 'react'
import fetchClient from '@/services/api/fetchClient'
import { getApplications, getColleges } from '@/services/mockData'
import { Application, College } from '@/types'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
// Using custom buttons for cleaner, modern action styling

const AdminApplications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([])
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        // Try real API endpoints first
        const [appsData, colsData] = await Promise.all([
          fetchClient.get('/applications'),
          fetchClient.get('/colleges'),
        ])

        if (mounted) {
          setApplications(appsData)
          setColleges(colsData)
        }
      } catch (err) {
        // Fallback to mock data
        try {
          const [mockApps, mockCols] = await Promise.all([getApplications(), getColleges()])
          if (mounted) {
            setApplications(mockApps)
            setColleges(mockCols)
          }
        } catch (mockErr) {
          if (mounted) setError('Failed to load applications')
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchData()
    return () => {
      mounted = false
    }
  }, [])

  const collegesMap = useMemo(() => {
    const m: Record<string, College> = {};
    (colleges || []).forEach((c: College) => {
      m[c.id] = c;
    });
    return m;
  }, [colleges]);

  const updateStatus = async (id: string, status: Application['status']) => {
    // Optimistic update locally
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)))

    // Try to persist to API; ignore errors but could surface them
      try {
      await fetchClient.patch(`/applications/${id}/status`, { status })
    } catch (err) {
      // If API update fails, we keep optimistic local change. Optionally, revert or notify.
      console.warn('Failed to persist status update', err)
    }
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom className="dark:text-white!">
        Applications
      </Typography>

      <TableContainer component={Paper} sx={{ backgroundColor: '#F8FAFC' }} className="dark:bg-gray-800!">
        <Table>
          <TableHead>
            <TableRow className="bg-[#F1F5F9] dark:bg-gray-700">
              <TableCell className="dark:text-[#CBD5E1]!"><span>Student ID</span></TableCell>
              <TableCell className="dark:text-[#CBD5E1]!"><span>College</span></TableCell>
              <TableCell className="dark:text-[#CBD5E1]!"><span>Program</span></TableCell>
              <TableCell className="dark:text-[#CBD5E1]!"><span>Status</span></TableCell>
              <TableCell className="dark:text-[#CBD5E1]!"><span>Submitted</span></TableCell>
              <TableCell className="dark:text-[#CBD5E1]!"><span>Actions</span></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="dark:text-white!">Loading...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} className="dark:text-white!">{error}</TableCell>
              </TableRow>
            ) : (
              applications.map((a) => (
                <TableRow key={a.id} className="hover:bg-[#F1F5F9] dark:hover:bg-gray-700">
                  <TableCell className="dark:text-[#94A3B8]!">{a.studentId}</TableCell>
                  <TableCell className="dark:text-white!">{collegesMap[a.collegeId]?.name ?? a.collegeId}</TableCell>
                  <TableCell className="dark:text-white!">{a.programId}</TableCell>
                  <TableCell className="dark:text-[#94A3B8]!">{a.status}</TableCell>
                  <TableCell className="dark:text-[#94A3B8]!">{new Date(a.submittedAt).toLocaleDateString()}</TableCell>
                  <TableCell className="dark:text-white!">
                    <div className="flex items-center gap-6">
                      <button
                        type="button"
                        onClick={() => updateStatus(a.id, 'shortlisted')}
                        className="uppercase font-semibold tracking-wide text-[#ff6b35] hover:text-[#ff8c5a] focus:outline-none focus:ring-2 focus:ring-[#ff6b35]/40 rounded-sm transition-colors"
                      >
                        Shortlist
                      </button>
                      <button
                        type="button"
                        onClick={() => updateStatus(a.id, 'rejected')}
                        className="uppercase font-semibold tracking-wide text-red-500 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 rounded-sm transition-colors"
                      >
                        Reject
                      </button>
                      <button
                        type="button"
                        onClick={() => updateStatus(a.id, 'waitlisted')}
                        className="uppercase font-semibold tracking-wide text-amber-500 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 rounded-sm transition-colors"
                      >
                        Waitlist
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default AdminApplications
