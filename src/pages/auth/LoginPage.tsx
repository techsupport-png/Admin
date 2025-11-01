import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import useAuthStore from '@/store/authStore';
import fetchClient from '@/services/api/fetchClient';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      setLoading(true);
      setError(null);
      // attempt login - accept a few common response shapes
      const response = await fetchClient.post('/auth/login', { email, password });
      // helpful debug log during development
      // eslint-disable-next-line no-console
      console.log('login response', response);

      // support several possible response shapes from different backends
      const user = response?.user || response?.data?.user || response?.userData || null;
      const token = response?.token || response?.accessToken || response?.data?.token || response?.data?.accessToken || null;

      if (!token || !user) {
        // If backend returned a different shape, surface the whole response
        throw new Error(response?.message || 'Invalid login response from server');
      }

      setToken(token);
      setUser(user);
      
      // Redirect based on user role
      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'college':
          navigate('/college');
          break;
        case 'franchise':
          navigate('/franchise');
          break;
        case 'student':
          navigate('/student');
          break;
        default:
          setError('Invalid user role');
      }
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error('login error', err);
      setError(err?.data?.message || err?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey.100',
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%', mx: 2 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            BridgeBound Portal
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Sign in to your account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;