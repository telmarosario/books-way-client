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
            class="d-inline-block align-text-center"
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
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <Link to="/aboutus" className="nav-link custom-link">
              <p>About Us</p>
            </Link>
            {isLoggedIn && (
              <Link to="/books/add-book" className="nav-link custom-link">
                <p>Add Book</p>
              </Link>
            )}
            {!isLoggedIn && (
              <>
                <Link to="/signup" className="nav-link custom-link">
                  <p>Sign up</p>
                </Link>

                <Link to="/login" className="nav-link custom-link">
                  <p>Login</p>
                </Link>
              </>
            )}
            <div>
              {user && (
                <Link to="/profile" className="nav-link custom-link">
                  {" "}
                  <p>My Profile</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
