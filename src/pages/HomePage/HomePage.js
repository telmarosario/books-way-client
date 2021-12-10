import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import bookService from "../../services/book.service";
import genres from "../../genres";

function HomePage() {
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [bookGenre, setBookGenre] = useState([]);
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

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };
  const handleGenre = (e) => {
    setBookGenre(e.target.value);
  };
  const handleGenreSearch = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div class="col-sm-10 col-md-12">
          {errorMessage && <p>{errorMessage}</p>}
          <form class="d-flex ms-auto me-auto w-50">
            <input
              class="form-control me-2 mb-5"
              name="bookSearch"
              type="text"
              placeholder="Search for a book"
              aria-label="Search"
              value={search}
              onChange={handleSearchInput}
            />
          </form>

          <form
            class="d-flex ms-auto me-auto w-50"
            onSubmit={handleGenreSearch}
          >
            <select
              value={bookGenre}
              onChange={handleGenre}
              className="form-control"
            >
              {genres.map((oneGenre) => {
                return <option value={oneGenre}>{oneGenre}</option>;
              })}
            </select>
            <button class="btn btn-light me-2 mb-5" type="submit">
              Search
            </button>
          </form>

          <div className="row row-cols-1 row-cols-md-3 g-4">
            {books.map((oneBook) => {
              return (
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
                            <li className="list-group-item">{oneBook.genre}</li>
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
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
