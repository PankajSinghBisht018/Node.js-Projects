import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';

const BlogCard = ({ blog, onDelete }) => {
  return (
      <Card sx={{ marginY: 3, padding: 2 ,marginTop:15}}>
        <CardMedia component="img" height="140" image={blog.image} alt={blog.title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {blog.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {blog.content}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(, 0, 0, 0.05)', 
            padding: '8px 16px', 
          }}
        >
          <Button
            size="small"
            color="primary"
            component={Link}
            to={`/edit-blog/${blog._id}`}
            startIcon={<Edit />}
            sx={{ backgroundColor: 'purple', color: 'black' }} 
            variant='outlined'
          >
            Edit
          </Button>
          <Button
            size="small"
            color="secondary"
            onClick={() => onDelete(blog._id)}
            startIcon={<Delete />}
            sx={{ backgroundColor: 'red', color: 'black' }} 
          >
            Delete
          </Button>
        </CardActions>
      </Card>
  );
};

export default BlogCard;
