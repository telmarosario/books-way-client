import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import genres from "../../genres";

import authService from "../../services/auth.service";
import fileService from "../../services/fileupload.service";

function SignupPage(props) {
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
    console.log(value);
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
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsername}
        />

        <label>Email:</label>
        <input type="text" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label>Profile Picture</label>
        <input type="file" onChange={handleFileUpload} />

        <label>What are your favorite book genres?</label>
        <select
          name=""
          value={favoriteGenres}
          onChange={handleFavoriteGenres}
          multiple
        >
          {genres.map((oneGenre) => {
            return <option value={oneGenre}>{oneGenre}</option>;
          })}
        </select>

        <button type="submit" disabled={!allowSubmit}>
          Sign Up
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;
