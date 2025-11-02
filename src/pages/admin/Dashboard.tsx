import { FC } from 'react';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const AdminDashboard: FC = () => {
  const stats = [
    {
      title: 'Total Colleges',
      value: '25',
      icon: <SchoolIcon sx={{ fontSize: 40, color: '#ff6b35' }} />,
    },
    {
      title: 'Active Students',
      value: '1,234',
      icon: <GroupIcon sx={{ fontSize: 40, color: '#10b981' }} />,
    },
    {
      title: 'Applications',
      value: '456',
      icon: <AssignmentIcon sx={{ fontSize: 40, color: '#f59e0b' }} />,
    },
    {
      title: 'Growth Rate',
      value: '+15%',
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: '#3b82f6' }} />,
    },
  ];

  return (
    <>
      <Typography variant="h4" gutterBottom className="dark:text-white!">
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card sx={{ backgroundColor: '#F8FAFC' }} className="dark:bg-gray-800!">
              <CardContent sx={{ textAlign: 'center' }}>
                {stat.icon}
                <Typography variant="h5" component="div" sx={{ mt: 2 }} className="dark:text-white!">
                  {stat.value}
                </Typography>
                <Typography color="text.secondary" className="dark:text-[#94A3B8]!">{stat.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default AdminDashboard;