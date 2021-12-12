import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import HomePage from "./pages/HomePage/HomePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AddBook from "./pages/AddBook/AddBook";
import BookDetails from "./pages/BookDetails/BookDetails";
import OtherUser from "./pages/OtherUser/OtherUser";
import EditBook from "./pages/EditBook/EditBook";

import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/books/add-book"
          element={
            <IsPrivate>
              <AddBook />
            </IsPrivate>
          }
        ></Route>

        <Route
          path="/books/:bookId"
          element={
            <IsPrivate>
              <BookDetails />
            </IsPrivate>
          }
        ></Route>

        <Route
          path="/user/:userId"
          element={
            <IsPrivate>
              <OtherUser />
            </IsPrivate>
          }
        ></Route>
        <Route
          path="/books/edit/:bookId"
          element={
            <IsPrivate>
              <EditBook />
            </IsPrivate>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
