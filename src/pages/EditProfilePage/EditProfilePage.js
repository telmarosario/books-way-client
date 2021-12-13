import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import genres from "../../genres";
import fileService from "../../services/fileupload.service";
import userService from "../../services/user.service";

function EditProfilePage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [favoriteGenres, setFavoriteGenres] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const userId = user._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.getUsersProfile(userId);
        const oneUser = response.data;

        setUsername(oneUser.username);
        setEmail(oneUser.email);
        setFavoriteGenres(oneUser.favoriteGenres);
        setImageUrl(oneUser.imageUrl);
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    };
    fetchData();
  }, []);

  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
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
  const handleFileUpload = async (e) => {
    try {
      const uploadData = new FormData();

      uploadData.append("imageUrl", e.target.files[0]); // <-- set the file in the form

      const response = await fileService.uploadImage(uploadData);

      setImageUrl(response.data.secure_url);
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to upload the file");
    }
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const requestBody = {
        username,
        email,
        favoriteGenres,
        imageUrl,
      };
      await userService.updateCurrentUser(requestBody);
      navigate(`/profile`);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="container">
            <div className="row">
              {/* Left column */}
              <div class="col-3"></div>

              <div className="col-sm-12 col-md-6">
                <label>Username:</label>
                <input
                  type="text"
                  className="form-control required"
                  required
                  value={username}
                  onChange={handleUsername}
                />

                <div className="form-group">
                  <label>Email: </label>
                  <textarea
                    className="form-control"
                    required
                    value={email}
                    onChange={handleEmail}
                  />
                </div>

                <div className="form-group">
                  <label>What are your favorite book genres? </label>
                  <select
                    name=""
                    value={favoriteGenres}
                    onChange={handleFavoriteGenres}
                    className="form-control"
                    required
                    multiple
                  >
                    {genres.map((oneGenre) => {
                      return <option value={oneGenre}>{oneGenre}</option>;
                    })}
                  </select>
                </div>

                <div className="form-group">
                  <label>Profile Picture: </label>
                  <input type="file" onChange={handleFileUpload} />
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
            {/* Right column */}
            <div className="col-3"></div>
          </div>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default EditProfilePage;
