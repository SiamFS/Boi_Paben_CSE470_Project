import React, { useState, useEffect } from 'react';
import './styles.css';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', author: '' });
  const [newComment, setNewComment] = useState({ content: '', author: '' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('Submitting post:', newPost);
      const response = await fetch('http://localhost:5000/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      const data = await response.json();
      setPosts([...posts, data]);
      setNewPost({ title: '', content: '', author: '' });
      setIsSidebarOpen(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleCommentSubmit = async (postId, event) => {
    event.preventDefault();
    try {
      console.log('Submitting comment:', newComment);
      const response = await fetch(`http://localhost:5000/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });
      const data = await response.json();
      const updatedPosts = posts.map(post =>
        post._id === postId ? { ...post, comments: data.comments } : post
      );
      setPosts(updatedPosts);
      setNewComment({ content: '', author: '' });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      await fetch(`http://localhost:5000/posts/${postId}/like`, { method: 'POST' });
      updatePostLikes(postId, 1);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleDislike = async (postId) => {
    try {
      await fetch(`http://localhost:5000/posts/${postId}/dislike`, { method: 'POST' });
      updatePostLikes(postId, -1);
    } catch (error) {
      console.error('Error disliking post:', error);
    }
  };

  const updatePostLikes = (postId, increment) => {
    setPosts(posts.map(post =>
      post._id === postId ? { ...post, likes: post.likes + increment } : post
    ));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
   <div className= "flex flex-grow mt-[180px] md:mt-[140px]"> 
    <div className="blog-container">
      <h1>Blog Posts</h1>
      <button className="plus-button" onClick={toggleSidebar}>+</button>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <form className="new-post-form" onSubmit={handlePostSubmit}>
          <h2>Create a New Post</h2>
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="form-input"
          />
          <textarea
            placeholder="Content"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            className="form-textarea"
          />
          <input
            type="text"
            placeholder="Author"
            value={newPost.author}
            onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
            className="form-input"
          />
          <button type="submit" className="submit-button">Create Post</button>
          <button type="button" className="close-button" onClick={toggleSidebar}>Close</button>
        </form>
      </div>

      {posts.map(post => (
        <div className="post" key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>Author: {post.author}</p>
          <p>Likes: {post.likes} Dislikes: {post.dislikes}</p>
          <button className="like-button" onClick={() => handleLike(post._id)}>Like</button>
          <button className="dislike-button" onClick={() => handleDislike(post._id)}>Dislike</button>

          <h3>Comments:</h3>
          {post.comments && post.comments.map(comment => (
            <div className="comment" key={comment._id}>
              <p>{comment.content}</p>
              <p>Author: {comment.author}</p>
            </div>
          ))}

          <form className="new-comment-form" onSubmit={(e) => handleCommentSubmit(post._id, e)}>
            <input
              type="text"
              placeholder="Your comment"
              value={newComment.content}
              onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Your name"
              value={newComment.author}
              onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
              className="form-input"
            />
            <button type="submit" className="submit-button">Add Comment</button>
          </form>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Blog;
