import { FC } from 'react';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import WebIcon from '@mui/icons-material/Web';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const CollegeDashboard: FC = () => {
  const stats = [
    {
      title: 'Programs',
      value: '12',
      icon: <WebIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      title: 'Applications',
      value: '89',
      icon: <AssignmentIcon sx={{ fontSize: 40, color: 'success.main' }} />,
    },
    {
      title: 'Page Views',
      value: '2.5K',
      icon: <VisibilityIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
    },
    {
      title: 'Conversion Rate',
      value: '8.2%',
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'info.main' }} />,
    },
  ];

  return (
    <>
      <Typography variant="h4" gutterBottom>
        College Dashboard
      </Typography>
      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                {stat.icon}
                <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                  {stat.value}
                </Typography>
                <Typography color="text.secondary">{stat.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CollegeDashboard;