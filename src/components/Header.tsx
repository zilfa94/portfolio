import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import viteLogo from '/vite.svg';
import { auth } from '../config/firebase';
import { useEffect, useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAdmin(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ height: 40 }}>
          <img 
            src={viteLogo} 
            alt="KidsCode Logo" 
            style={{ height: '100%' }}
          />
        </Box>
        <Box>
          <IconButton color="primary" onClick={() => navigate('/')}>
            <HomeIcon />
          </IconButton>
          {isAdmin ? (
            <>
              <IconButton color="primary" onClick={() => navigate('/admin')}>
                <LoginIcon />
              </IconButton>
              <IconButton color="primary" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </>
          ) : (
            <IconButton color="primary" onClick={() => navigate('/login')}>
              <LoginIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
