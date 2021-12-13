import userService from "../../services/user.service";
import { useEffect, useState } from "react";
import BookCard from "../../components/BookCard/BookCard";

function SavedBooks() {
  const [userInfo, setUserInfo] = useState(null);

  const fetchData = async () => {
    const response = await userService.getUserSavedBooks();
    setUserInfo(response.data);
    console.log(userInfo);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>My saved books</h1>
      <div className="container">
        <div className="row">
          <div className="col-sm-0 col-md-3"></div>
          <div className="row row-cols-2 row-cols-md-4 g-4">
            {userInfo &&
              userInfo.savedBooks.map((book) => {
                return <BookCard key={book._id} oneBook={book} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedBooks;
