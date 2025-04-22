import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { login } from '../store/slices/authSlice';

const AdminRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminKey: '',
  });

  const [passwordError, setPasswordError] = useState('');
  const [adminError, setAdminError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    
    // Check password match after updating the form data
    if (name === 'confirmPassword' || name === 'password') {
      if (updatedFormData.password !== updatedFormData.confirmPassword) {
        setPasswordError('Passwords do not match');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAdminError('');
    
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await axios.post('/api/auth/register-admin', registerData);
      
      // Store token and update auth state
      localStorage.setItem('token', response.data.token);
      dispatch(login(response.data));
      
      // Redirect to admin dashboard
      navigate('/admin');
    } catch (error) {
      setAdminError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Admin Registration
        </Typography>

        {adminError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {adminError}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            margin="normal"
            required
            error={!!passwordError}
            helperText={passwordError}
          />
          <TextField
            fullWidth
            label="Admin Key"
            name="adminKey"
            type="password"
            value={formData.adminKey}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Box sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading || !!passwordError}
            >
              {loading ? 'Registering...' : 'Register as Admin'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AdminRegister; 