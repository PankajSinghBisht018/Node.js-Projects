import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog by id', error);
    throw error;
  }
};

const registerUser = (userData) => {
  return axios.post(`${API_URL}/users/register`, userData);
};

const loginUser = (userData) => {
  return axios.post(`${API_URL}/users/login`, userData);
};

const getBlogs = () => {
  return axios.get(`${API_URL}/blogs`);
};

const createBlog = (blogData, token) => {
  return axios.post(`${API_URL}/blogs`, blogData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const updateBlog = (id, blogData, token) => {
  return axios.put(`${API_URL}/blogs/${id}`, blogData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const deleteBlog = (id, token) => {
  return axios.delete(`${API_URL}/blogs/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export { getBlogById, registerUser, loginUser, getBlogs, createBlog, updateBlog, deleteBlog };
