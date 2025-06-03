import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Box,
  Chip,
  Alert,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { fetchPosts } from '../store/slices/postSlice';
import PeopleCards from '../components/PeopleCards';
import Loader from '../components/Loader';

const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(posts) && posts.length > 0) {
      const tags = [...new Set(posts.flatMap(post => post.tags || []))];
      setAllTags(tags);
      setFilteredPosts(posts);
    }
  }, [posts]);

  useEffect(() => {
    let filtered = Array.isArray(posts) ? [...posts] : [];
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post =>
        post.tags && selectedTags.every(tag => post.tags.includes(tag))
      );
    }
    setFilteredPosts(filtered);
  }, [searchTerm, selectedTags, posts]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Loader />
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

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 4 }, mb: { xs: 4, sm: 6 }, px: { xs: 0, sm: 3, md: 4 } }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            background: `linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '2rem',
            fontWeight: 700,
            display: 'inline-block',
          }}
        >
          Articles
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {allTags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onClick={() => handleTagToggle(tag)}
                  color={selectedTags.includes(tag) ? 'primary' : 'default'}
                  variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
                />
              ))}
            </Box>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                {(searchTerm || selectedTags.length > 0) && (
                  <Button variant="text" color="primary" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>

          {(searchTerm || selectedTags.length > 0) && (
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Showing {filteredPosts.length} of {Array.isArray(posts) ? posts.length : 0} posts
              </Typography>
            </Box>
          )}
        </Box>

        {filteredPosts.length === 0 ? (
          <Alert severity="info">No posts match your search criteria.</Alert>
        ) : (
          <Grid container 
            spacing={2}
          >
            {filteredPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post._id}>
                <Card sx={{ 
                height: '300px',
                display: 'flex', 
                flexDirection: 'column', 
                borderRadius: '5px',
                border: '1px solid rgba(30, 41, 59, 0.9)'
                 }}>
                  {post.media?.[0]?.type === 'image' && (
                    <CardMedia
                      component="img"
                      height="200"
                      loading="lazy"
                      image={post.media[0].url}
                      alt={post.title}
                    />
                  )}
                  <CardActionArea component={RouterLink} to={`/posts/${post._id}`}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        By {post.author?.username} • {new Date(post.createdAt).toLocaleDateString()}
                      </Typography>
                      <Typography     // body of posts
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                        }}
                        dangerouslySetInnerHTML={{
                          __html: post.content.substring(0, 150) + '...',
                        }}
                      />
                      {post.tags && post.tags.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                          {post.tags.slice(0, 3).map((tag) => (
                            <Chip key={tag} label={tag} size="small" sx={{ mr: 1, mb: 1 }} />
                          ))}
                          {post.tags.length > 3 && (
                            <Typography variant="caption" color="text.secondary">
                              +{post.tags.length - 3} more
                            </Typography>
                          )}
                        </Box>
                      )}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      <PeopleCards />
    </>
  );
};

export default Home;
