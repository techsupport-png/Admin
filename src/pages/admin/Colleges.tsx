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
      <Typography variant="h4" gutterBottom>
        Colleges
      </Typography>

      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => alert('Create college (example)')}>
        Create College
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Subdomain</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Programs</TableCell>
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
              colleges.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.subdomain}</TableCell>
                  <TableCell>
                    <a href={c.website} target="_blank" rel="noreferrer">
                      {c.website}
                    </a>
                  </TableCell>
                  <TableCell>{c.location}</TableCell>
                  <TableCell>{c.programs?.length ?? 0}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => alert('Edit ' + c.name)}>
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
