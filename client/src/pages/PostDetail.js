import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Grid,
} from '@mui/material';
import { fetchPost } from '../store/slices/postSlice';

const PostDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentPost: post, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!post) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Alert severity="info">Post not found</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: {xs: 2, sm: 4}, mb: { xs: 4, sm: 6 }, px: { xs: 0, sm: 3, md: 4 } }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom
          sx={{ xs: '0.75rem', sm: '1rem', md: '2rem' }}
        >
          {post.title}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" color="text.secondary" 
            sx={{ xs: '0.6rem', sm: '0.75rem' }}
          >
            By {post.author?.username} • {new Date(post.createdAt).toLocaleDateString()}
          </Typography>
        </Box>

        
        {post.media && post.media.length > 0 && (
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {post.media.map((item, index) => (
              <Grid item xs={12} key={index}>
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={`Post media ${index + 1}`}
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                ) : (
                  <video
                    src={item.url}
                    controls
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        )}

        <Box
          sx={{
            '& .ql-editor': {
              padding: 0,
              fontSize: { xs: '0.5rem', sm: '0.7rem', md: '1.1rem' },
              lineHeight: 1.6,
            },
            '& p': {
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            }
            
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.tags && post.tags.length > 0 && (
          <Box sx={{ mt: 3 }}>
            {post.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default PostDetail; 