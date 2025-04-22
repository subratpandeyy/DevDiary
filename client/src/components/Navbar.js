import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { logout } from '../store/slices/authSlice';
import ThemeToggle from './ThemeToggle';
import trisonic from '../data/trisonic.png';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate('/');
  };

  return (
    // <AppBar position="static">
    <nav>
      <Toolbar 
        sx={{
          mt: 0,
          mb: -3,
          height: 90,
          background: 
              'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)',
          backdropFilter: 'blur(8px)',
          borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
        }}
      >
        <Typography 
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            fontSize: '2.5rem',
            color: 'white',
            fontWeight: 700,
          }}
        >
          <img src={trisonic} alt='Logo' style={{ height: 240 }} />
        </Typography>

        <Box><ThemeToggle /></Box>

        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
          {isAuthenticated ? (
            <>
              {user?.role === 'admin' && (
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/admin"
                  sx={{ mr: 2 }}
                >
                  Admin Dashboard
                </Button>
              )}
              <IconButton
                size="large"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                sx={{
                  color: 'grey',
                  mr: 2,
                  ml: 2,
                }}
                // color="inherit"
                component={RouterLink}
                to="/login"
              >
                Sign in
              </Button>
              <Button
                sx={{
                  color: 'white',
                  // display: 'none',
                }}
                // color="inherit"
                component={RouterLink}
                to="/admin/register"
              >
                Sign up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
      </nav>
 
  );
};

export default Navbar; 