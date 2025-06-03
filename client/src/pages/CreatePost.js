import React, { useState, useRef } from 'react';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Grid
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createPost, fetchPosts } from '../store/slices/postSlice';
import axios from 'axios';

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.posts);
  const quillRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'draft',
    tags: [],
  });

  const [tagInput, setTagInput] = useState('');
  const [media, setMedia] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (content) => {
    setFormData({ ...formData, content });
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({
          ...formData,
          tags: [...formData.tags, tagInput.trim()],
        });
      }
      setTagInput('');
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToDelete),
    });
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();

    for (const file of files) {
      formData.append('media', file);
    }

    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setMedia([...media, data]);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }

    if (!formData.content.trim()) {
      alert('Please enter content');
      return;
    }

    try {
      const postData = {
        ...formData,
        media: media.map((item) => ({
          type: item.type,
          url: item.url,
          public_id: item.public_id,
        })),
      };

      await dispatch(createPost(postData)).unwrap();
      dispatch(fetchPosts());
      navigate('/admin');
    } catch (error) {
      console.error('Error creating post:', error);
      alert(`Failed to create post: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Post
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12} paddingBottom={8}>
              <ReactQuill
                ref={quillRef}
                value={formData.content}
                onChange={handleEditorChange}
                style={{ height: '250px', marginBottom: '50px' }}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ color: [] }, { background: [] }],
                    ['link', 'image', 'video'],
                    ['clean'],
                  ],
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="published">Published</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Add Tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
                margin="normal"
                helperText="Press Enter to add a tag"
              />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleDeleteTag(tag)}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" component="label">
                Upload Media
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                />
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  mt: 2,
                }}
              >
                {media.map((item, index) => (
                  <Box key={index} sx={{ maxWidth: 200 }}>
                    {item.type === 'image' ? (
                      <img
                        src={item.url}
                        alt={`Uploaded ${index + 1}`}
                        style={{ width: '100%', borderRadius: '8px' }}
                      />
                    ) : (
                      <video
                        src={item.url}
                        controls
                        style={{ width: '100%', borderRadius: '8px' }}
                      />
                    )}
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                fullWidth
              >
                {loading ? 'Creating...' : 'Create Post'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CreatePost;
