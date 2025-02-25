// src/components/Footer.jsx
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                mt: 'auto',
                py: 2,
                px: 2,
                textAlign: 'center',
                backgroundColor: '#FFFFFF',
                color: '#000000',
                borderTop: '4px solid #FF0000', // linha vermelha
            }}
        >
            <Typography
                variant="body2"
                sx={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: { xs: '0.8rem', md: '1rem' },
                    fontWeight: 500,
                }}
            >
                Crafted by
                <br /> Wellinton Karvat
            </Typography>
        </Box>
    );
};

export default Footer;
