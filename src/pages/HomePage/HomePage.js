/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import bookService from "../../services/book.service";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchGenre from "../../components/SearchGenre/SearchGenre";

function HomePage() {
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const getAllBooks = async () => {
    try {
      const response = await bookService.getAllBooks();
      setBooks(response.data);
      setAllBooks(response.data);
      console.log(allBooks);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const searchFilter = (chars) => {
    const filteredBooks = allBooks.filter((book) => {
      return book.title.toLowerCase().includes(chars.toLowerCase());
    });

    setBooks(filteredBooks);
  };

  const filterGenre = (option) => {
    let filterGenre;
    if (option === "All") {
      filterGenre = allBooks;
    } else {
      filterGenre = allBooks.filter((oneBook) => {
        return oneBook.genre === option;
      });
    }
    setBooks(filterGenre);
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div class="col-sm-10 col-md-12">
          {errorMessage && <p>{errorMessage}</p>}

          <SearchBar searchFilter={searchFilter} />
          <SearchGenre filterGenre={filterGenre} />

          <div className="row row-cols-1 row-cols-md-3 g-4">
            {books.map((oneBook) => {
              return (
                <Link to={`/books/${oneBook._id}`}>
                  <div className="col">
                    <div
                      className="card h-100 mb-3"
                      style={{ maxWidth: "600px" }}
                    >
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src={oneBook.imageUrl}
                            className="img-fluid rounded-start"
                            alt="..."
                            style={{ width: "15em" }}
                          />
                        </div>
                        <div class="col-md-8">
                          <div className="card-body">
                            <ul class="list-group list-group-flush">
                              <h5 className="card-title">{oneBook.title}</h5>
                              <li className="list-group-item">
                                {oneBook.tradeOrSale}
                              </li>
                              <li className="list-group-item">
                                {oneBook.genre}
                              </li>
                              {oneBook.price ? (
                                <li className="list-group-item">
                                  {oneBook.price}
                                </li>
                              ) : (
                                ""
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
