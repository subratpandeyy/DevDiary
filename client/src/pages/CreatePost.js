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
      console.log('Submitting post with data:', formData);
      console.log('Media data:', media);
      
      const postData = {
        ...formData,
        media: media.map((item) => ({
          type: item.type,
          url: item.url,
          public_id: item.public_id,
        })),
      };
      
      console.log('Final post data to submit:', postData);
      
      const result = await dispatch(createPost(postData)).unwrap();
      console.log('Post created successfully:', result);
      
      // Refresh the posts list
      dispatch(fetchPosts());
      
      navigate('/admin');
    } catch (error) {
      console.error('Error creating post:', error);
      alert(`Failed to create post: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Post
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Box sx={{ mt: 2, mb: 2 }}>
            <ReactQuill
              ref={quillRef}
              value={formData.content}
              onChange={handleEditorChange}
              style={{ height: '200px', marginBottom: '50px' }}
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  [{ 'color': [] }, { 'background': [] }],
                  ['link', 'image', 'video'],
                  ['clean']
                ]
              }}
            />
          </Box>

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

          <TextField
            fullWidth
            label="Add Tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagInputKeyDown}
            margin="normal"
            helperText="Press Enter to add a tag"
          />

          <Box sx={{ mt: 1, mb: 2 }}>
            {formData.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleDeleteTag(tag)}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>

          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2, mb: 2 }}
          >
            Upload Media
            <input
              type="file"
              hidden
              multiple
              accept="image/*,video/*"
              onChange={handleFileUpload}
            />
          </Button>

          <Box sx={{ mt: 2, mb: 2 }}>
            {media.map((item, index) => (
              <Box key={index} sx={{ mt: 1 }}>
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={`Uploaded ${index + 1}`}
                    style={{ maxWidth: '200px', marginRight: '10px' }}
                  />
                ) : (
                  <video
                    src={item.url}
                    controls
                    style={{ maxWidth: '200px', marginRight: '10px' }}
                  />
                )}
              </Box>
            ))}
          </Box>

          <Box sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Post'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CreatePost; 