import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import logoImage from "./logo.png";
import "./Navbar.css";

function Navbar() {
  // Get the value from the context
  const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
      <div className="container-fluid">
        <Link class="navbar-brand brand-custom" to="/">
          <img
            src={logoImage}
            alt=""
            width="80"
            height="80"
            class="d-inline-block align-text-top"
          />
          <span>BooksWay</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {isLoggedIn && (
              <Link to="/books/add-book" className="nav-link">
                Add Book
              </Link>
            )}
            {!isLoggedIn && (
              <>
                <Link to="/signup" className="nav-link">
                  Sign up
                </Link>

                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </>
            )}
            <div className="profile-img-wrapper">
              {user && <Link to="/profile">My Profile</Link>}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
