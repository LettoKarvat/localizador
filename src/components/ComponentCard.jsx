// src/components/ComponentCard.jsx
import { useState } from 'react';
import { Card, CardContent, Typography, Box, IconButton, TextField, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ComponentCard = ({ component, isAdmin, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComponent, setEditedComponent] = useState(component);

  const handleChange = (e) => {
    setEditedComponent({
      ...editedComponent,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onUpdate(editedComponent);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja excluir este componente?")) {
      onDelete(component["Código "]);
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        {isEditing ? (
          <>
            <TextField
              name="Código "
              label="Código"
              value={editedComponent["Código "]}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="Localização "
              label="Localização"
              value={editedComponent["Localização "]}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="Tam - Grav"
              label="Tam - Grav"
              value={editedComponent["Tam - Grav"]}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="MRK MRB"
              label="MRK MRB"
              value={editedComponent["MRK MRB"]}
              onChange={handleChange}
              fullWidth
            />
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" onClick={handleSave} sx={{ mr: 1 }}>
                Save
              </Button>
              <Button variant="outlined" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </Box>
          </>
        ) : (
          <>
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
              Tam - Grav: {component["Tam - Grav"] || 'N/A'}
            </Typography>
            <Typography variant="body2">
              MRK MRB: {component["MRK MRB"] || 'N/A'}
            </Typography>
            {isAdmin && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <IconButton onClick={() => setIsEditing(true)} size="small">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={handleDelete} size="small">
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ComponentCard;
