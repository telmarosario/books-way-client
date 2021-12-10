import { useState } from "react";
import { useNavigate } from "react-router-dom";
import genres from "../../genres";
import fileService from "../../services/fileupload.service";
import bookService from "../../services/book.service";

function AddBook() {
  const [isOnSale, setIsOnSale] = useState(false);
  const [title, setTitle] = useState("");
  const [condition, setCondition] = useState("");
  const [saleOption, setSaleOption] = useState("trade");
  const [price, setPrice] = useState(0);
  const [bookGenre, setBookGenre] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleTitle = (e) => setTitle(e.target.value);
  const handleCondition = (e) => setCondition(e.target.value);
  const handleOptions = (e) => {
    setSaleOption(e.target.value);
    setIsOnSale(true);
  };
  const handlePrice = (e) => setPrice(e.target.value);
  const handleGenre = (e) => {
    console.log(e.target.value);
    setBookGenre(e.target.value);
  };
  const handleFileUpload = async (e) => {
    try {
      const uploadData = new FormData();

      uploadData.append("imageUrl", e.target.files[0]); // <-- set the file in the form

      const response = await fileService.uploadImage(uploadData);

      setImageUrl(response.data.secure_url);
      setAllowSubmit(true);
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to upload the file");
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const requestBody = {
        title,
        condition,
        saleOption,
        price,
        bookGenre,
        imageUrl,
      };
      await bookService.createBook(requestBody);

      //* Change letter to book view
      navigate("/");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Book</h1>
      <div className="form-group">
        <div className="container">
          <div className="row">
            {/* Left column */}
            <div class="col-3"></div>

            <div className="col-sm-12 col-md-6">
              <label>Title of the Book</label>
              <input
                type="text"
                className="form-control required"
                placeholder="Harry Potter and The Chamber Of Secrets"
                required
                value={title}
                onChange={handleTitle}
              />

              <div className="form-group">
                <label>Condition: </label>
                <textarea
                  className="form-control"
                  placeholder="Special Edition. It's brand new"
                  required
                  value={condition}
                  onChange={handleCondition}
                />
              </div>

              <div className="form-group">
                <label>This book is for: </label>
                <select
                  className="form-control"
                  onChange={handleOptions}
                  value={saleOption}
                >
                  <option value="trade">Trade</option>
                  <option value="sale">Sale</option>
                </select>
              </div>

              {isOnSale && (
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={handlePrice}
                  />
                </div>
              )}

              <div className="form-group">
                <label>What is this book about?</label>
                <select
                  name=""
                  value={bookGenre}
                  onChange={handleGenre}
                  className="form-control"
                  required
                >
                  {genres.map((oneGenre) => {
                    return <option value={oneGenre}>{oneGenre}</option>;
                  })}
                </select>
              </div>

              <div className="form-group">
                <label>Picture of your book</label>
                <input type="file" onChange={handleFileUpload} />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={!allowSubmit}
              >
                Submit
              </button>
            </div>
          </div>
          {/* Right column */}
          <div className="col-3"></div>
        </div>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
}

export default AddBook;
