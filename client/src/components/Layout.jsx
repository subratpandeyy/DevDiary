import React from 'react';
import { Box, Container, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Navbar from './Navbar';
import BackToTop from './BackToTop';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';

const Layout = ({ children }) => {
  const theme = useTheme();

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
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
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
                Trisonic
              </Box>
            </Box>
            
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 2, sm: 2 },
                color: theme.palette.text.secondary,
                fontSize: '0.875rem',
              }}
            >
              <Box component="span">© 2025 Trisonic</Box>
              <Box component="span"
                sx={{
                  display: 'flex',
                  gap: { xs: 2, sm: 4 },
                }}
              >Priyanshu Gupta
                <Link href="http://www.linkedin.com/in/priyanshu-guptaji"><LinkedInIcon 
                  sx={{
                    color: 'white',
                  }}
                /></Link>
                <Link href="https://x.com/PRIYANSHUG49497"
                  sx={{
                    color: 'white',
                  }}
                ><XIcon /></Link>
                <Link href="https://github.com/priyanshu-guptaji"
                  sx={{
                    color: 'white',
                  }}
                ><GitHubIcon /></Link>
              </Box>
              <Box component="span"
                sx={{
                  display: 'flex',
                  gap: { xs: 2, sm: 4 },
                }}
              >Sonali Subhadarshini
              <Link href="https://www.linkedin.com/in/sonali-subhadarshini-sahoo/"
                sx={{
                  color: 'white',
                }}
              ><LinkedInIcon /></Link>
                <Link href="https://x.com/Sonali_0804"
                  sx={{
                    color: 'white',
                  }}
                ><XIcon /></Link>
                <Link href="https://github.com/sonalisubhadarshini08"
                  sx={{
                    color: 'white',
                  }}
                ><GitHubIcon /></Link>
              </Box>
              <Box component="span"
                sx={{
                  display: 'flex',
                  gap: { xs: 2, sm: 4 },
                }}
              >Subrat Pandey
              <Link href="https://www.linkedin.com/in/contact-subrat-pandey/"
                sx={{
                  color: 'white',
                }}
              ><LinkedInIcon /></Link>
                <Link href="https://x.com/12SubratPandey"
                  sx={{
                    color: 'white',
                  }}
                ><XIcon /></Link>
                <Link href="https://github.com/subratpandeyy"
                  sx={{
                    color: 'white',
                  }}
                ><GitHubIcon /></Link>
              </Box>
              <Box component="span"><Link href="mailto:scribbleorgs@gmail.com"
                sx={{
                  textDecoration: 'none',
                }}
              >Contact us</Link></Box>
              
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 