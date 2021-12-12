/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import userService from "../../services/user.service";
import { Link } from "react-router-dom";

function ProfilePage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
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
      <h1>Profile Page</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {isLoggedIn && (
        <div>
          <button onClick={logOutUser}>Logout</button>
        </div>
      )}

      {userInfo && (
        <div>
          <img src={userInfo.imageUrl} alt="profile" />
          <h4>{userInfo.username}</h4>
          <h4>{userInfo.email}</h4>
          {userInfo.favoriteGenres.map((genre) => {
            return <span>{genre} </span>;
          })}

          {userInfo.booksSaleTrade.map((book) => {
            return (
              <Link to={`/books/${book._id}`}>
                <h4>{book.title}</h4>
                <img src={book.imageUrl} alt="" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
