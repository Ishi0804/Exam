import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/UserSlice';

function Header() {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <header className="bg-dark shadow w-100 position-fixed start-0 top-0" style={{ zIndex: 9999 }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center py-3">
         

          {/* Navigation Links */}
          <nav className="d-none d-md-flex gap-3 align-items-center">
            <Link to="/addpost" className="btn btn-outline-light">
              Add Post
            </Link>
            <Link to="/" className="btn btn-outline-success">
              Show Posts
            </Link>
          </nav>

          {/* User Actions */}
          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle"
              type="button"
              id="userMenu"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {token ? "Account" : "Login"}
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
              {token ? (
                <>
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login" className="dropdown-item">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Responsive Navigation for Mobile */}
        <nav className="d-flex d-md-none justify-content-center gap-3 mt-2">
          <Link to="/addpost" className="btn btn-outline-light btn-sm">
            Add Post
          </Link>
          <Link to="/" className="btn btn-outline-success btn-sm">
            Show Posts
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
