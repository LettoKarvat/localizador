// src/App.jsx
import { useState, useEffect, useMemo } from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';
import debounce from 'lodash.debounce';
import SearchBar from './components/SearchBar';
import ComponentCard from './components/ComponentCard';
import { components } from './data/components';
import Footer from './components/Footer';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMRB, setSearchMRB] = useState('');
  const [filteredComponents, setFilteredComponents] = useState([]);

  const debouncedSearch = useMemo(
    () =>
      debounce((codeTerm, mrbTerm) => {
        if (!codeTerm && !mrbTerm) {
          setFilteredComponents([]);
          return;
        }

        const filtered = components.filter((component) => {
          const code = String(component["Código "] || '').toLowerCase();
          const mrb = String(component["MRK MRB"] || '').toLowerCase();
          return code.includes(codeTerm.toLowerCase()) && mrb.includes(mrbTerm.toLowerCase());
        });

        setFilteredComponents(filtered);
      }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm, searchMRB);
    return () => debouncedSearch.cancel();
  }, [searchTerm, searchMRB, debouncedSearch]);

  const showNoResultsAlert = (searchTerm || searchMRB) && filteredComponents.length === 0;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Faz o footer grudar no fim
      }}
    >
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Component Search System
        </Typography>

        <SearchBar
          label="Pesquisar por Código"
          placeholder="Ex: 11540 ou N7185..."
          value={searchTerm}
          onChange={setSearchTerm}
        />

        <SearchBar
          label="Pesquisar por MRK MRB"
          placeholder="Ex: CRK3348..."
          value={searchMRB}
          onChange={setSearchMRB}
        />

        {showNoResultsAlert && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Nenhum componente encontrado para esses filtros
          </Alert>
        )}

        <Box>
          {filteredComponents.map((component, index) => (
            <ComponentCard key={index} component={component} />
          ))}
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}

export default App;
