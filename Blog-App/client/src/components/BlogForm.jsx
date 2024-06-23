import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createBlog, updateBlog, getBlogById } from '../api';
import { TextField, Button, Typography, Grid, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const validationSchema = yup.object({
  title: yup.string('Enter blog title').required('Title is required'),
  content: yup.string('Enter blog content').required('Content is required'),
  category: yup.string('Enter blog category').required('Category is required'),
  image: yup.mixed().required('Image is required'),
});

const BlogForm = ({ isEdit }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const [initialValues, setInitialValues] = useState({
    title: '',
    content: '',
    category: '',
    image: null,
  });

  useEffect(() => {
    if (isEdit) {
      const fetchBlog = async () => {
        try {
          const blogData = await getBlogById(id);
          setInitialValues({
            title: blogData.title,
            content: blogData.content,
            category: blogData.category,
            image: blogData.image,
          });
        } catch (error) {
          console.error('Error fetching blog for editing', error);
        }
      };
      fetchBlog();
    }
  }, [isEdit, id]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('content', values.content);
        formData.append('category', values.category);
        formData.append('image', values.image);

        if (isEdit) {
          await updateBlog(id, formData, token);
        } else {
          await createBlog(formData, token);
        }
        navigate('/');
      } catch (error) {
        console.error('Error creating/updating blog', error);
      }
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue('image', event.currentTarget.files[0]);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          backgroundColor: 'rgba(0,0,0,0.4)',
          color: 'white', 
          maxWidth: '400px',
          width: '100%',
          borderRadius: 2,
          padding: 4,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          {isEdit ? 'Edit Blog' : 'Add Blog'}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              InputLabelProps={{ style: { color: 'white'} }} 
              InputProps={{
                style: { color: 'white',  }, 
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="content"
              name="content"
              label="Content"
              multiline
              rows={4}
              value={formik.values.content}
              onChange={formik.handleChange}
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
              InputLabelProps={{ style: { color: 'white',  } }}
              InputProps={{
                style: { ccolor: 'white',  },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="category"
              name="category"
              label="Category"
              value={formik.values.category}
              onChange={formik.handleChange}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
              InputLabelProps={{ style: { color: 'white',  } }}
              InputProps={{
                style: { color: 'white',  },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="image"
              name="image"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="image">
              <Button variant="outlined" component="span" sx={{bgcolor: 'pink', color:'black'}} >
                Upload Image
              </Button>
            </label>
            {formik.touched.image && formik.errors.image && (
              <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
                {formik.errors.image}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined"  sx={{bgcolor: 'pink', color:'black'}} fullWidth type="submit">
              {isEdit ? 'Update Blog' : 'Post Blog'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default BlogForm;
