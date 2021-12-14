/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../../context/auth.context";
import BookService from "../../services/book.service";
import bookService from "../../services/book.service";
import "./BookDetails.css";

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

  const saveBook = async () => {
    try {
      await bookService.saveToFavorites(bookId);
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
      {errorMessage && <p>{errorMessage}</p>}
      {book && (
        <div className="container mt-5">
          <div className="row">
            {/* First Column */}
            <div className="col-sm-6 col-md-5 d-flex justify-content-end row ms-3">
              <img src={book.imageUrl} alt="book cover" />
            </div>

            {/* Second column */}
            <div className="col-sm-5 col-md-5 mt-5 d-flex justify-content-start">
              <div className="column text-start ms-4">
                <button className="btn custom-btn mb-2" onClick={saveBook}>
                  ❤️ Save to favorites
                </button>
                <h4 className="custom-book-text text-start">{book.title}</h4>
                <h4 className="custom-book-details">{book.condition}</h4>
                <h4 className="custom-book-details button-74">
                  {book.tradeOrSale}
                </h4>
                {book.price ? (
                  <h4 className="custom-book-details">Price: {book.price}€</h4>
                ) : (
                  ""
                )}
                <div>
                  <h4 className="custom-book-details button-21">
                    {book.genre}
                  </h4>
                </div>

                <div>
                  <p className="custom-user-owner">
                    This book was published by:{" "}
                  </p>
                  <Link
                    to={`/user/${book.userOwner._id}`}
                    className="custom-link-details"
                  >
                    {book.userOwner.username}
                  </Link>
                </div>

                <div>
                  {user._id === book.userOwner._id ? (
                    <Link to={`/books/edit/${book._id}`}>
                      <button className="btn edit-delete-btn mt-5">
                        Edit Book
                      </button>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  {user._id === book.userOwner._id ? (
                    <button
                      className="btn edit-delete-btn mt-5"
                      onClick={deleteBook}
                    >
                      Delete Book
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            {/* Third column */}
            <div class="col-sm-1 col-md-2 mb-5"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookDetails;
