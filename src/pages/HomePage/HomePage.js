/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import bookService from "../../services/book.service";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchGenre from "../../components/SearchGenre/SearchGenre";
import BookCard from "../../components/BookCard/BookCard";
import "./HomePage.css";

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

          <div className="d-flex justify-content-center mt-5 mb-5">
            <SearchBar searchFilter={searchFilter} />
            <SearchGenre filterGenre={filterGenre} />
          </div>
          <div className="row row-cols-2 row-cols-md-5 g-4">
            {books.map((oneBook) => {
              return <BookCard key={oneBook._id} oneBook={oneBook} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
