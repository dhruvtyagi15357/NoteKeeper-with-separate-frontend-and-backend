import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation().pathname
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          NoteKeeper
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location === "/home" || location === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location === "/about" ? "active" : ""}`}
                to="/about">
                about
              </Link>
            </li>
            {/* <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="#">Action</Link></li>
                <li><Link className="dropdown-item" to="#">Another action</Link></li>
                <li><hr className="dropdown-divider"/></li>
                <li><Link className="dropdown-item" to="#">Something else here</Link></li>
              </ul>
            </li> */}
            {/* <li className="nav-item">
              <Link className="nav-link disabled" aria-disabled="true">Disabled</Link>
            </li> */}
          </ul>
          <div className="d-flex">
            {!localStorage.getItem("token") ? (
              <div>
                <Link
                  className="btn btn-primary mx-2"
                  to={`/login`}
                  role="button">
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-2"
                  to={`/signup`}
                  role="button">
                  Signup
                </Link>
              </div>
            ) : (
              <button className="btn btn-primary mx-2" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar