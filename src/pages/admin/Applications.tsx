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
import Button from '@mui/material/Button'

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
      <Typography variant="h4" gutterBottom>
        Applications
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>College</TableCell>
              <TableCell>Program</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Submitted</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6}>Loading...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6}>{error}</TableCell>
              </TableRow>
            ) : (
              applications.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>{a.studentId}</TableCell>
                  <TableCell>{collegesMap[a.collegeId]?.name ?? a.collegeId}</TableCell>
                  <TableCell>{a.programId}</TableCell>
                  <TableCell>{a.status}</TableCell>
                  <TableCell>{new Date(a.submittedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => updateStatus(a.id, 'shortlisted')}>
                      Shortlist
                    </Button>
                    <Button size="small" color="error" onClick={() => updateStatus(a.id, 'rejected')}>
                      Reject
                    </Button>
                    <Button size="small" onClick={() => updateStatus(a.id, 'waitlisted')}>
                      Waitlist
                    </Button>
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
