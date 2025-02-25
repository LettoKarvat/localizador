import { Card, CardContent, Typography, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ComponentCard = ({ component }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Código: {component["Código "]}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'primary.light',
            p: 1,
            borderRadius: 1,
            mb: 2,
          }}
        >
          <LocationOnIcon sx={{ mr: 1 }} />
          <Typography variant="body1" color="primary.contrastText">
            Localização: {component["Localização "]}
          </Typography>
        </Box>

        <Typography variant="body2">
          Tam - Grav: {component["Tam - Grav"] ?? 'N/A'}
        </Typography>
        <Typography variant="body2">
          MRK MRB: {component["MRK MRB"] ?? 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ComponentCard;
