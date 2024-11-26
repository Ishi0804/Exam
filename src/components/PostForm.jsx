import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePostThunk } from '../redux/PostSlice';
import { useParams, useNavigate } from 'react-router-dom';

const PostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    category: '',
    createdAt: ''
  });

  const { id } = useParams();
  const posts = useSelector((state) => state.posts.posts);
  const fetchEditData = posts.find((data) => data.id === id);

  useEffect(() => {
    if (fetchEditData) {
      setFormData({
        title: fetchEditData.title,
        content: fetchEditData.content,
        image: fetchEditData.image,
        category: fetchEditData.category,
        createdAt: fetchEditData.createdAt
      });
    }
  }, [fetchEditData]);

  const handleChange = (e) => {
    const { id, value, files } = e.target;

    if (id === 'image' && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result
        }));
      };

      reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login firsttttt');
      navigate('/login');
      return;
    }

    try {
      if (id) {
        await dispatch(updatePostThunk({ id, updateData: formData })).unwrap();
        alert('Post updated successfully!');
      } else {
        const newPost = {
          ...formData,
          createdAt: new Date().toISOString(),
          id: Date.now().toString()
        };
        await dispatch(createPost(newPost)).unwrap();
        alert('Post created successfully!');
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      alert('Failed to save the post');
    }

    setFormData({
      title: '',
      content: '',
      image: '',
      category: '',
      createdAt: '',
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="col-lg-6">
          <div className="card bg-dark text-light shadow-lg">
            <div className="card-header bg-primary text-center py-3">
              <h4 className="mb-0 text-light">{id ? 'Edit Blog Post' : 'Create New Blog Post'}</h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="mb-4">
                  <label htmlFor="title" className="form-label fw-bold">Title</label>
                  <input
                    type="text"
                    className="form-control bg-secondary text-light border-0"
                    id="title"
                    placeholder="Enter post title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Content */}
                <div className="mb-4">
                  <label htmlFor="content" className="form-label fw-bold">Content</label>
                  <textarea
                    className="form-control bg-secondary text-light border-0"
                    id="content"
                    rows="6"
                    placeholder="Write your blog post content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {/* Image Upload */}
                <div className="mb-4">
                  <label htmlFor="image" className="form-label fw-bold">Upload Image</label>
                  <input
                    type="file"
                    className="form-control bg-secondary text-light border-0"
                    id="image"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>

                {/* Category */}
                <div className="mb-4">
                  <label htmlFor="category" className="form-label fw-bold">Category</label>
                  <select
                    className="form-select bg-secondary text-light border-0"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="technology">Technology</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="travel">Travel</option>
                    <option value="food">Food</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100 py-2">
                  {id ? 'Update Post' : 'Publish Post'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
