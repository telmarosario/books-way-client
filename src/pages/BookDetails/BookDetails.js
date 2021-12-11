import BookService from "../../services/book.service";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function BookDetails() {
  const [book, setBook] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { bookId } = useParams();

  const getBook = async () => {
    try {
      const response = await BookService.getOneBook(bookId);
      setBook(response.data);
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
        </div>
      )}
    </div>
  );
}

export default BookDetails;
