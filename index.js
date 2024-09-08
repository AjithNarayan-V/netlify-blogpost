    import bodyParser from 'body-parser';
  import cors from 'cors';
  import express from 'express';
  import mongoose from "mongoose";
    // Import the Post model
    import Post from './models/post.js';
    import dotenv from 'dotenv';
    dotenv.config();
    const app = express();

    // Middleware
    app.use(cors());
    app.use(bodyParser.json());

    // Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://ajithnarayan004:ajith@cluster0.ceklz.mongodb.net/blogpost?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
  console.log('MongoDB connected');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1); // Exit if the connection fails
});

 
    // API Endpoints

    // Get all posts
    app.get('/api/posts', async (req, res) => {
      try {
        const posts = await Post.find();
        res.json(posts);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching posts' });
      }
    });

    // Get a single post by ID  
    app.get('/api/posts/:id', async (req, res) => {
      try {
        const post = await Post.findById(req.params.id);
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching post' });
      }
    });

    // Create a new post
    app.post('/api/posts', async (req, res) => {
      try {
        const newPost = new Post(req.body);
        await newPost.save();
        console.log(newPost);
        res.status(201).json(newPost);
      } catch (error) {
        res.status(400).json({ message: 'Error creating post' });
      }
    });

    // Update a post by ID
    app.put('/api/posts/:id', async (req, res) => {
      try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!updatedPost) {
          return res.status(404).json({ message: 'Post not found' });
        }

        res.json(updatedPost);
      } catch (error) {
        res.status(400).json({ message: 'Error updating post' });
      }
    });


    // Delete a post by ID
    app.delete('/api/posts/:id', async (req, res) => {
      try {
        console.log(req.params.id);
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
          return res.status(404).json({ message: 'Post not found' });
        }
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ message: 'Error deleting post' });
      }
    });

    // Start the server
    const PORT = process.env.PORT || 8747; // For local dev only, Vercel assigns a port automatically
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    