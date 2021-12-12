/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import userService from "../../services/user.service";
import BookCard from "../../components/BookCard/BookCard";
import { Link } from "react-router-dom";
import "./ProfilePage.css";

function ProfilePage() {
  const { user, logOutUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const userId = user._id;

  const getUserInfo = async () => {
    try {
      const response = await userService.getUsersProfile(userId);
      setUserInfo(response.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}

      {userInfo && (
        <div className="container">
          <div className="row">
            {/* First Column */}
            <div className="col-sm-3 col-md-3 d-flex justify-content-end row">
              <img
                src={userInfo.imageUrl}
                alt="profile"
                className="custom-pfp"
              />
              <div>
                <button onClick={logOutUser}>Logout</button>
              </div>
              <div>
                <Link to="/user-profile/edit">
                  <button>Update Profile</button>
                </Link>
              </div>
            </div>

            {/* Second column */}
            <div className="col-sm-8 col-md-7">
              <p>{userInfo.username}</p>
              <p>Contact: {userInfo.email}</p>
              <p>Favorite Book Genres:</p>
              {userInfo.favoriteGenres.map((genre) => {
                return <button>{genre} </button>;
              })}
              <h4>Books for Sale or Trade:</h4>
            </div>
            {/* Third column */}
            <div class="col-sm-1 col-md-2"></div>
          </div>
        </div>
      )}
      <div className="container">
        <div className="row">
          <div className="col-sm-0 col-md-3"></div>
          <div className="row row-cols-2 row-cols-md-4 g-4">
            {userInfo &&
              userInfo.booksSaleTrade.map((book) => {
                return <BookCard key={book._id} oneBook={book} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
