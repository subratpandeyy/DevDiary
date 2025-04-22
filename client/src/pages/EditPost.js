import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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
  CircularProgress,
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { fetchPost, updatePost } from '../store/slices/postSlice';
import axios from 'axios';

const EditPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentPost: post, loading, error } = useSelector((state) => state.posts);
  const quillRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'draft',
    tags: [],
  });

  const [tagInput, setTagInput] = useState('');
  const [media, setMedia] = useState([]);

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        status: post.status,
        tags: post.tags || [],
      });
      setMedia(post.media || []);
    }
  }, [post]);

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
      const { data } = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setMedia([...media, data]);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleDeleteMedia = async (publicId) => {
    try {
      await axios.delete(`/api/upload/${publicId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMedia(media.filter((item) => item.public_id !== publicId));
    } catch (error) {
      console.error('Error deleting media:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      ...formData,
      media: media.map((item) => ({
        type: item.type,
        url: item.url,
        public_id: item.public_id,
      })),
    };
    dispatch(updatePost({ id, postData })).then(() => {
      navigate('/admin');
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Post
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
              <Box key={index} sx={{ mt: 1, position: 'relative', display: 'inline-block' }}>
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
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDeleteMedia(item.public_id)}
                  sx={{ position: 'absolute', top: 0, right: 0 }}
                >
                  Delete
                </Button>
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
              {loading ? 'Updating...' : 'Update Post'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default EditPost; 