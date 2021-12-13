import BookService from "../../services/book.service";
import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../../context/auth.context";

function BookDetails() {
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { bookId } = useParams();
  const navigate = useNavigate();

  const getBook = async () => {
    try {
      const response = await BookService.getOneBook(bookId);
      setBook(response.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const deleteBook = async () => {
    try {
      await BookService.deleteBook(bookId);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  return (
    <div>
      <h1>Book Details</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {book && (
        <div>
          <h2>{book.title}</h2>
          <h4>{book.tradeOrSale}</h4>

          {book.price ? <h4>{book.price}</h4> : ""}

          <h4>{book.condition}</h4>
          <h4>{book.genre}</h4>
          <img src={book.imageUrl} alt="book cover" />
          <Link to={`/user/${book.userOwner._id}`}>
            {book.userOwner.username}
          </Link>
          {user._id === book.userOwner._id ? (
            <Link to={`/books/edit/${book._id}`}>
              <button>Edit Book</button>
            </Link>
          ) : (
            ""
          )}
          {user._id === book.userOwner._id ? (
            <button onClick={deleteBook}>Delete Book</button>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}

export default BookDetails;
