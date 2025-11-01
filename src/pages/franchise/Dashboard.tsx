import { FC } from 'react';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PeopleIcon from '@mui/icons-material/People';
import ContactsIcon from '@mui/icons-material/Contacts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const FranchiseDashboard: FC = () => {
  const stats = [
    {
      title: 'Active Leads',
      value: '145',
      icon: <PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      title: 'New Contacts',
      value: '23',
      icon: <ContactsIcon sx={{ fontSize: 40, color: 'success.main' }} />,
    },
    {
      title: 'Conversion Rate',
      value: '12%',
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
    },
    {
      title: 'Completed',
      value: '67',
      icon: <CheckCircleIcon sx={{ fontSize: 40, color: 'info.main' }} />,
    },
  ];

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Franchise Dashboard
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

export default FranchiseDashboard;