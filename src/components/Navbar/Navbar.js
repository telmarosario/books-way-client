import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import logoImage from "./logo.png";
import "./Navbar.css";

function Navbar() {
  // Get the value from the context
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid">
        <Link class="navbar-brand" to="/">
          <img
            src={logoImage}
            alt=""
            width="80"
            height="80"
            class="d-inline-block align-text-top"
          />
          BooksWay
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
              <div className="nav-link">
                <button onClick={logOutUser}>Logout</button>
              </div>
            )}
            {!isLoggedIn && (
              <>
                <Link to="/signup" className="nav-link">
                  <button>Sign Up</button>
                </Link>

                <Link to="/login" className="nav-link">
                  <button>Login</button>
                </Link>
              </>
            )}
            <div className="profile-img-wrapper">
              {user && (
                <Link to="/profile">
                  <img
                    className="profile-img"
                    src={user.profilePicture}
                    alt="profile"
                  />
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
