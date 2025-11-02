import React, { useEffect, useState } from 'react'
import fetchClient from '@/services/api/fetchClient'
import { getColleges } from '@/services/mockData'
import { College } from '@/types'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const AdminColleges: React.FC = () => {
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    const fetchColleges = async () => {
      setLoading(true)
      setError(null)
      try {
  // Try real API first (fetch client returns parsed JSON)
  const data = await fetchClient.get('/colleges')
  if (mounted) setColleges(data)
      } catch (err) {
        // Fallback to mock data if API fails
        try {
          const mock = await getColleges()
          if (mounted) setColleges(mock)
        } catch (mockErr) {
          if (mounted) setError('Failed to load colleges')
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchColleges()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <div>
      <Typography variant="h4" gutterBottom className="dark:text-white!">
        Colleges
      </Typography>

      <button
        onClick={() => alert('Create college (example)')}
        className="mb-2 inline-flex items-center gap-2 bg-[#ff6b35] text-white px-4 py-2.5 rounded-lg hover:bg-[#e85a2a] transition-colors shadow-sm"
      >
        Create College
      </button>

      <TableContainer component={Paper} sx={{ backgroundColor: '#F8FAFC' }} className="dark:bg-gray-800!">
        <Table>
          <TableHead>
            <TableRow className="bg-[#F1F5F9] dark:bg-gray-700">
              <TableCell className="dark:text-[#CBD5E1]!"><span>Name</span></TableCell>
              <TableCell className="dark:text-[#CBD5E1]!"><span>Subdomain</span></TableCell>
              <TableCell className="dark:text-[#CBD5E1]!"><span>Website</span></TableCell>
              <TableCell className="dark:text-[#CBD5E1]!"><span>Location</span></TableCell>
              <TableCell className="dark:text-[#CBD5E1]!"><span>Programs</span></TableCell>
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
              colleges.map((c) => (
                <TableRow key={c.id} className="hover:bg-[#F1F5F9] dark:hover:bg-gray-700">
                  <TableCell className="dark:text-white!">{c.name}</TableCell>
                  <TableCell className="dark:text-[#94A3B8]!">{c.subdomain}</TableCell>
                  <TableCell className="dark:text-white!">
                    <a href={c.website} target="_blank" rel="noreferrer" className="text-[#ff6b35] hover:underline">
                      {c.website}
                    </a>
                  </TableCell>
                  <TableCell className="dark:text-[#94A3B8]!">{c.location}</TableCell>
                  <TableCell className="dark:text-[#94A3B8]!">{c.programs?.length ?? 0}</TableCell>
                  <TableCell className="dark:text-white!">
                    <Button size="small" onClick={() => alert('Edit ' + c.name)} sx={{ color: '#ff6b35' }}>
                      Edit
                    </Button>
                    <Button size="small" color="error" onClick={() => alert('Delete ' + c.name)}>
                      Delete
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

export default AdminColleges
