/* eslint-disable react-hooks/exhaustive-deps */
import userService from "../../services/user.service";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "./../../context/auth.context";
import BookCard from "../../components/BookCard/BookCard";
import "./OtherUser.css";

function OtherUser() {
  const [otherUser, setOtherUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { userId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getOtherUser = async () => {
    try {
      if (user._id === userId) {
        navigate("/profile");
      } else {
        const response = await userService.getUsersProfile(userId);
        setOtherUser(response.data);
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    getOtherUser();
  }, []);

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}

      {otherUser && (
        <div className="container">
          <div className="row">
            {/* First Column */}
            <div className="col-sm-3 col-md-3 d-flex justify-content-end row">
              <img
                src={otherUser.imageUrl}
                alt="profile"
                className="custom-pfp"
              />
            </div>

            {/* Second column */}
            <div className="col-sm-8 col-md-7">
              <p>{otherUser.username}</p>
              <p>Contact: {otherUser.email}</p>
              <p>Favorite Book Genres:</p>
              {otherUser.favoriteGenres.map((genre) => {
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
            {otherUser &&
              otherUser.booksSaleTrade.map((book) => {
                return <BookCard key={book._id} oneBook={book} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtherUser;
