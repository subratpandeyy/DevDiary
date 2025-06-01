import React from 'react';
import { Box, Button, Container, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Navbar from './Navbar';
import BackToTop from './BackToTop';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';

const Layout = ({ children }) => {
  const theme = useTheme();

  const contributors = [
    {
      name: 'Priyanshu Gupta',
      links: {
        linkedin: 'https://www.linkedin.com/in/priyanshu-guptaji',
        x: 'https://x.com/PRIYANSHUG49497',
        github: 'https://github.com/priyanshu-guptaji',
      },
    },
    {
      name: 'Sonali Subhadarshini',
      links: {
        linkedin: 'https://www.linkedin.com/in/sonali-subhadarshini-sahoo/',
        x: 'https://x.com/Sonali_0804',
        github: 'https://github.com/sonalisubhadarshini08',
      },
    },
    {
      name: 'Subrat Pandey',
      links: {
        linkedin: 'https://www.linkedin.com/in/contact-subrat-pandey/',
        x: 'https://x.com/12SubratPandey',
        github: 'https://github.com/subratpandeyy',
      },
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 50% 0%, ${theme.palette.primary.main}22 0%, transparent 50%),
                      radial-gradient(circle at 0% 100%, ${theme.palette.secondary.main}22 0%, transparent 50%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Navbar />
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          flex: 1,
          py: { xs: 4, sm: 4, md: 2 },
          px: { xs: 2, sm: 3, md: 4 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </Container>
      <BackToTop />

      <Box
        component="footer"
        sx={{
          py: { xs: 3, sm: 4 },
          px: { xs: 2, sm: 3 },
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
          backdropFilter: 'blur(8px)',
          borderTop: `1px solid ${theme.palette.divider}`,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: { xs: 'center', md: 'space-between' },
              alignItems: 'center',
              gap: 2,
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box
                component="span"
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Dev Diary
              </Box>
            </Box>
            
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column' ,sm: 'column', md: 'row' },
                justifyContent: 'center',
                gap: { xs: 2, sm: 4 },
                color: theme.palette.text.secondary,
                fontSize: '0.875rem',
              }}
            >

              {contributors.map((contributor) => (
                <Box
                  key={contributor.name}
                  component="span"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: { xs: 1, sm: 1 },
                  }}
                >
                  {contributor.name}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      gap: { xs: 2, sm: 2 },
                    }}
                  >
                    <Link
                      href={contributor.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`LinkedIn - ${contributor.name}`}
                      sx={{ color: theme.palette.text.primary }}
                    >
                      <LinkedInIcon />
                    </Link>
                    <Link
                      href={contributor.links.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`X - ${contributor.name}`}
                      sx={{ color: theme.palette.text.primary }}
                    >
                      <XIcon />
                    </Link>
                    <Link
                      href={contributor.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`GitHub - ${contributor.name}`}
                      sx={{ color: theme.palette.text.primary }}
                    >
                      <GitHubIcon />
                    </Link>
                  </Box>
                </Box>
              ))}
              
            </Box>
            <Box component="span">
                <Button
                  href="mailto:scribbleorgs@gmail.com"
                  sx={{
                    textDecoration: 'none',
                    color: '#65bbcf',
                    fontSize: '15px'
                  }}
                >
                  Contact us
                </Button>
                <Box component="span" 
            sx={{ fontSize: '12px',
             }}>
            © 2025 Dev Diary</Box>
              </Box>
          </Box>
          
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
