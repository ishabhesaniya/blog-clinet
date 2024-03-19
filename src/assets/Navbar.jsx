import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css'; // Import the CSS file

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('userData');
    // Update isLoggedIn state to false
    setIsLoggedIn(false);
    // Redirect to the home page
    navigate('/');
  };

  return (
    <div className="container-xxl position-relative p-0">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-3">
        <a href="#" className="navbar-brand p-0" style={{ textDecoration: 'none' }}>
          <h1 className="text-warning m-0"><i className="fa fa-utensils me-3"></i>It Intreview</h1>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto"> 
            <li className="nav-item">
              <Link className="nav-link text-light" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/feedback">Blog</Link>
            </li>
            {isLoggedIn ? (
              <li className="nav-item">
                <button className="nav-link text-light" onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link text-light" to="/signin">Login</Link>
              </li>
            )}
          </ul>
        </div>
        </nav>
      </div>
    
  );
}

export default Navbar;
