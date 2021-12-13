import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "./LoginPage.css";

import authService from "../../services/auth.service";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { logInUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = async (e) => {
    try {
      e.preventDefault();
      const requestBody = { username, password };
      const response = await authService.login(requestBody);

      // Save the token and set the user as logged in ...
      const token = response.data.authToken;
      logInUser(token);
      navigate("/");
    } catch (error) {
      // If the request resolves with an error, set the error message in the state
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleLoginSubmit}>
        <h3 className="mt-5 mb-3">Login</h3>
        <div className="form-group">
          <div className="container">
            <div className="row">
              {/* Left column */}
              <div class="col-3"></div>

              <div className="col-sm-12 col-md-6">
                <label>Username:</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={username}
                  onChange={handleUsername}
                />

                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={handlePassword}
                />

                <button
                  className="btn mt-4 mb-4 custom-login-btn"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  );
}

export default LoginPage;
