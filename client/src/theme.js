import { createTheme } from '@mui/material/styles';

export const createAppTheme = (isDarkMode) => {
  return createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#3B82F6', // Bright blue
        light: '#60A5FA',
        dark: '#2563EB',
      },
      secondary: {
        main: '#8B5CF6', // Purple
        light: '#A78BFA',
        dark: '#7C3AED',
      },
      background: {
        default: isDarkMode ? '#0F172A' : '#F8FAFC', // Dark blue-gray : Light gray
        paper: isDarkMode ? '#0f0f0f' : '#FFFFFF', // Slightly lighter blue-gray : White
      },
      text: {
        primary: isDarkMode ? '#F8FAFC' : '#1E293B', // Almost white : Dark blue-gray
        secondary: isDarkMode ? '#CBD5E1' : '#64748B', // Light gray : Medium gray
      },
      success: {
        main: '#10B981',
      },
      error: {
        main: '#EF4444',
      },
      warning: {
        main: '#F59E0B',
      },
      info: {
        main: '#3B82F6',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '4rem',
        fontWeight: 800,
        lineHeight: 1.1,
        letterSpacing: '-0.025em',
        background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        '@media (max-width:600px)': {
          fontSize: '2.5rem',
        },
      },
      h2: {
        fontSize: '3rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.025em',
        '@media (max-width:600px)': {
          fontSize: '2rem',
        },
      },
      h3: {
        fontSize: '2.25rem',
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: '-0.025em',
        '@media (max-width:600px)': {
          fontSize: '1.75rem',
        },
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: '-0.025em',
      },
      body1: {
        fontSize: '1.125rem',
        lineHeight: 1.7,
        letterSpacing: '0.00938em',
      },
      body2: {
        fontSize: '1rem',
        lineHeight: 1.6,
        letterSpacing: '0.00938em',
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '5px',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            boxShadow: 'none',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
            },
          },
          contained: {
            background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
            },
          },
          outlined: {
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            // borderRadius: '5px',
            background: isDarkMode 
              // ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.8) 100%)'
              ? 'linear-gradient(135deg, #0f0f0f 0%, #0F172A 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease-in-out',
            // '&:hover': {
            //   transform: 'translateY(-4px)',
            //   boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
            // },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '1rem',
              background: isDarkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(248, 250, 252, 0.8)',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              },
            },
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: '2px',
            paddingRight: '2px',
            '@media (min-width: 600px)': {
              paddingLeft: '2px',
              paddingRight: '2px',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: isDarkMode 
              ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)'
              : 'linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(241, 245, 249, 0.8) 100%)',
            backdropFilter: 'blur(8px)',
            borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          },
        },
      },
    },
    shape: {
      borderRadius: 5,
    },
    spacing: 8,
  });
}; 