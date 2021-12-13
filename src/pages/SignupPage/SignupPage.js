import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import genres from "../../genres";
import "./SignupPage.css";

import authService from "../../services/auth.service";
import fileService from "../../services/fileupload.service";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [favoriteGenres, setFavoriteGenres] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handleFileUpload = async (e) => {
    try {
      const uploadData = new FormData();

      uploadData.append("imageUrl", e.target.files[0]); // <-- set the file in the form

      const response = await fileService.uploadImage(uploadData);

      setImageUrl(response.data.secure_url);
      setAllowSubmit(true);
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to upload the file");
    }
  };

  const handleFavoriteGenres = (e) => {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setFavoriteGenres(value);
  };

  const handleSignupSubmit = async (e) => {
    try {
      e.preventDefault();
      // Create an object representing the request body
      // Add profile picture with the cloudinary setup
      const requestBody = {
        email,
        password,
        username,
        imageUrl,
        favoriteGenres,
      };

      // Request to api with service
      await authService.signup(requestBody);

      // If the request is successful navigate to login page
      navigate("/login");
    } catch (error) {
      // If the request resolves with an error, set the error message in the state
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignupSubmit}>
        <h3 className="mt-5 mb-3">Sign up and start trading</h3>
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
                  name="username"
                  value={username}
                  onChange={handleUsername}
                  required
                />

                <div className="form-group mt-3">
                  <label>Email:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                  />
                </div>

                <div className="form-group mt-3">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Profile Picture</label>
                  <input
                    className="form-control"
                    type="file"
                    onChange={handleFileUpload}
                  />
                </div>

                <div className="form-group d-flex flex-column mt-3">
                  <label>What are your favorite book genres?</label>
                  <select
                    className="form-control"
                    name=""
                    value={favoriteGenres}
                    onChange={handleFavoriteGenres}
                    multiple
                  >
                    {genres.map((oneGenre) => {
                      return <option value={oneGenre}>{oneGenre}</option>;
                    })}
                  </select>
                </div>

                <button
                  className="btn custom-signup-btn mt-4 mb-4"
                  type="submit"
                  disabled={!allowSubmit}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
          {/* Right column */}
          <div className="col-3"></div>
        </div>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="mb-5">
        Already have account? <Link to={"/login"}> Login</Link>
      </p>
    </div>
  );
}

export default SignupPage;
