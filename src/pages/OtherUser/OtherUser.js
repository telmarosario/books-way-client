import userService from "../../services/user.service";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function OtherUser() {
  const [otherUser, setOtherUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { userId } = useParams();

  const getOtherUser = async () => {
    try {
      const response = await userService.getUsersProfile(userId);
      setOtherUser(response.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    getOtherUser();
  }, []);

  return (
    <div>
      <h1>Other user</h1>
      {errorMessage && <p>{errorMessage}</p>}

      {otherUser && (
        <div>
          <img src={otherUser.imageUrl} alt="profile" />
          <h4>{otherUser.username}</h4>
          <h4>{otherUser.email}</h4>
          {otherUser.favoriteGenres.map((genre) => {
            return <span>{genre} </span>;
          })}

          {otherUser.booksSaleTrade.map((book) => {
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

export default OtherUser;
