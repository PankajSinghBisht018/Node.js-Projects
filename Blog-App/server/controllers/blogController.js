const Blog = require('../models/Blog');

async function getBlogs(req, res) {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function createBlog(req, res) {
    const { title, content, category } = req.body;

    try {
        const newBlog = new Blog({ title, content, category, user: req.user.id });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function updateBlog(req, res) {
    const { title, content, category } = req.body;

    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (blog.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        blog.title = title;
        blog.content = content;
        blog.category = category;

        await blog.save();
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function deleteBlog(req, res) {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (blog.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await Blog.findByIdAndDelete(req.params.id);

        res.json({ message: 'Blog removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {getBlogs,createBlog,updateBlog,deleteBlog};
