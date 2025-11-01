import { FC } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const StudentDashboard: FC = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Student Dashboard
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1">Welcome to your student portal. From here you can manage your applications, profile, and documents.</Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default StudentDashboard;
