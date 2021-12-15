/* eslint-disable react-hooks/exhaustive-deps */
import userService from "../../services/user.service";
import chatService from "../../services/chat.service";
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

  const createConversation = async () => {
    try {
      const conversationinfo = {
        senderId: user._id,
        receiverId: otherUser._id,
      };
      await chatService.createConversation(conversationinfo);
      navigate("/chat");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}

      {otherUser && (
        <div className="container mt-5">
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
            <div className="col-sm-8 col-md-7 mt-5">
              <h4 className="custom-user-info-ou">{otherUser.username}</h4>
              <button className="button-21-ou" onClick={createConversation}>
                Message
              </button>
              <p className="custom-p-tag-ou">
                You can contact me via: <b>{otherUser.email}</b>
              </p>
              <p className="custom-p-tag-ou">Favorite Book Genres:</p>
              {otherUser.favoriteGenres.map((genre) => {
                return <button className="button-21-ou">{genre} </button>;
              })}
            </div>
            {/* Third column */}
            <div class="col-sm-1 col-md-2"></div>
          </div>
        </div>
      )}
      <div className="container">
        <div className="row">
          <div className="col-sm-0 col-md-3"></div>
          <h4 className="mt-5">Books for Sale or Trade:</h4>
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
