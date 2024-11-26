import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePostThunk } from '../redux/PostSlice';
import { useNavigate } from 'react-router-dom';

function ShowPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleNavigate = (id) => {
    navigate(`/addpost/${id}`);
  };

  if (status === 'loading') {
    return (
      <div className="container py-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="container py-4 text-center text-danger">
        <h4>Error: {error}</h4>
      </div>
    );
  }

  return (
    <div className="container py-5 mt-4">
      <h2 className="text-center text-white mb-4">All Blog Posts</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {posts.map((post) => (
          <div key={post.id} className="col">
            <div className="card h-100 shadow-lg bg-dark text-white border-0">
              <div className="position-relative">
                <img
                  src={post.image || 'https://via.placeholder.com/800x400'}
                  className="card-img-top"
                  alt="Post thumbnail"
                  style={{ height: '220px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }}
                />
                <span className="badge bg-primary position-absolute top-0 end-0 m-3">
                  {post.category}
                </span>
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold mb-3">{post.title}</h5>
                <p className="card-text flex-grow-1 text-muted">{post.content.slice(0, 100)}...</p>
                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-outline-primary w-100 me-2"
                    onClick={() => handleNavigate(post.id)}
                  >
                    <i className="fas fa-edit me-2"></i>Edit
                  </button>
                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={() => dispatch(deletePostThunk(post.id))}
                  >
                    <i className="fas fa-trash-alt me-2"></i>Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowPost;
