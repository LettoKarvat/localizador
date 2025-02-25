// src/App.jsx
import { useState, useEffect, useMemo } from 'react';
import { Container, Typography, Box, Alert, IconButton } from '@mui/material';
import debounce from 'lodash.debounce';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import SearchBar from './components/SearchBar';
import ComponentCard from './components/ComponentCard';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import AdminLoginDialog from './components/AdminLoginDialog';
import { components as initialComponents } from './data/components';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [components, setComponents] = useState(initialComponents);
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
          return (
            code.includes(codeTerm.toLowerCase()) &&
            mrb.includes(mrbTerm.toLowerCase())
          );
        });
        setFilteredComponents(filtered);
      }, 300),
    [components]
  );

  useEffect(() => {
    debouncedSearch(searchTerm, searchMRB);
    return () => debouncedSearch.cancel();
  }, [searchTerm, searchMRB, debouncedSearch]);

  const showNoResultsAlert = (searchTerm || searchMRB) && filteredComponents.length === 0;

  // Função para logout do admin
  const handleLogout = () => setIsAdmin(false);
  // Abre o diálogo de login
  const handleOpenLogin = () => setOpenLoginDialog(true);
  // Fecha o diálogo de login
  const handleCloseLogin = () => setOpenLoginDialog(false);
  // Define o usuário como admin após login
  const handleAdminLogin = () => setIsAdmin(true);

  // Funções de CRUD para admin
  const handleAddComponent = (newComponent) => {
    setComponents([...components, newComponent]);
  };

  const handleUpdateComponent = (updatedComponent) => {
    setComponents(
      components.map((component) =>
        component["Código "] === updatedComponent["Código "] ? updatedComponent : component
      )
    );
  };

  const handleDeleteComponent = (code) => {
    setComponents(components.filter((component) => component["Código "] !== code));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Sistema de pesquisa de componentes
        </Typography>

        {/* Botão de login/dislogin discreto com ícone */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          {!isAdmin ? (
            <IconButton onClick={handleOpenLogin} aria-label="Login as Admin">
              <LockOpenIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleLogout} aria-label="Logout Admin">
              <LockIcon />
            </IconButton>
          )}
        </Box>

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
            <ComponentCard
              key={index}
              component={component}
              isAdmin={isAdmin}
              onUpdate={handleUpdateComponent}
              onDelete={handleDeleteComponent}
            />
          ))}
        </Box>

        {isAdmin && <AdminPanel onAddComponent={handleAddComponent} />}
      </Container>

      <Footer />

      {/* Diálogo de Login para Admin */}
      <AdminLoginDialog
        open={openLoginDialog}
        onClose={handleCloseLogin}
        onLogin={handleAdminLogin}
      />
    </Box>
  );
}

export default App;
