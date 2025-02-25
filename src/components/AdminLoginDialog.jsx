
import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';

const AdminLoginDialog = ({ open, onClose, onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        // Senha hardcoded para demonstração
        if (password === 'admin123') {
            onLogin();
            setPassword('');
            setError('');
            onClose();
        } else {
            setError('Senha incorreta. Tente novamente.');
        }
    };

    const handleCancel = () => {
        setPassword('');
        setError('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleCancel}>
            <DialogTitle>Admin Login</DialogTitle>
            <DialogContent>
                <TextField
                    label="Senha"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                />
                {error && <Typography color="error" variant="body2">{error}</Typography>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">Cancelar</Button>
                <Button onClick={handleLogin} variant="contained" color="primary">Login</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AdminLoginDialog;
