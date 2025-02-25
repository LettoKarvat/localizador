
import { useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';

const AdminPanel = ({ onAddComponent }) => {
    const [newComponent, setNewComponent] = useState({
        "Localização ": '',
        "Código ": '',
        "Tam - Grav": '',
        "MRK MRB": ''
    });

    const handleChange = (e) => {
        setNewComponent({
            ...newComponent,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Em uma aplicação real, você deve validar os dados antes
        onAddComponent(newComponent);
        setNewComponent({
            "Localização ": '',
            "Código ": '',
            "Tam - Grav": '',
            "MRK MRB": ''
        });
    };

    return (
        <Paper sx={{ p: 2, mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                Adicionar componente
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    name="Localização "
                    label="Localização"
                    value={newComponent["Localização "]}
                    onChange={handleChange}
                />
                <TextField
                    name="Código "
                    label="Código"
                    value={newComponent["Código "]}
                    onChange={handleChange}
                />
                <TextField
                    name="Tam - Grav"
                    label="Tam - Grav"
                    value={newComponent["Tam - Grav"]}
                    onChange={handleChange}
                />
                <TextField
                    name="MRK MRB"
                    label="MRK MRB"
                    value={newComponent["MRK MRB"]}
                    onChange={handleChange}
                />
                <Button type="submit" variant="contained">
                    Add Component
                </Button>
            </Box>
        </Paper>
    );
};

export default AdminPanel;
