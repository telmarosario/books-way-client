import axios from "axios";

class BookService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  createBook = async (requestBody) => {
    return this.api.post("/api/books", requestBody);
  };

  getAllBooks = async () => {
    return this.api.get("/api/books");
  };

  getOneBook = async (bookId) => {
    return this.api.get(`/api/books/${bookId}`);
  };

  editBook = async (bookId, requestBody) => {
    return this.api.put(`/api/books/${bookId}`, requestBody);
  };

  deleteBook = async (bookId) => {
    return this.api.delete(`/api/books/${bookId}`);
  };

  saveToFavorites = async (bookId) => {
    return this.api.post(`/api/books/${bookId}`);
  };
}

// Create one instance of the service
const bookService = new BookService();

export default bookService;
