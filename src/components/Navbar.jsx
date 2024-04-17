import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, InputBase, IconButton, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CreateAuctionForm from './CreateAuctionForm';
import '../styling/Navbar.css';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateAuctionForm, setShowCreateAuctionForm] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault(); 
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`); 
    }
  };

  const toggleCreateAuctionForm = () => {
    setShowCreateAuctionForm(!showCreateAuctionForm);
  };

  return (
    <AppBar position="sticky" style={{ backgroundColor: '#d9c09e', color: '#333' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Min Auktionsplats
        </Typography>
        <Button color="inherit" component={Link} to="/" sx={{ color: 'inherit' }}>
          Hem
        </Button>
        <Button color="inherit" component={Link} to="/auktioner" sx={{ color: 'inherit' }}>
          Auktioner
        </Button>
        <Button color="inherit" onClick={toggleCreateAuctionForm} sx={{ color: 'inherit' }}>
          Skapa Auktioner
        </Button>
        <Box component="form" onSubmit={handleSearch} sx={{ position: 'relative', marginLeft: '10px', backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: '4px' }}>
          <InputBase
            sx={{ marginLeft: '8px', flex: 1 }}
            placeholder="Sök…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton type="submit" sx={{ padding: '10px', color: 'inherit' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>
      </Toolbar>
      {showCreateAuctionForm && <CreateAuctionForm />}
    </AppBar>
  );
}

export default Navbar;

