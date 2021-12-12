import { Link } from "react-router-dom";

function BookCard({ oneBook }) {
  return (
    <div>
      <Link to={`/books/${oneBook._id}`}>
        <div className="col">
          <div className="card">
            <img
              src={oneBook.imageUrl}
              className="card-img-top"
              alt="..."
              style={{ height: "15rem" }}
            />
            <div className="card-body">
              <h5 className="card-title">{oneBook.title}</h5>
              <p className="card-text">{oneBook.tradeOrSale}</p>
              {oneBook.price ? (
                <p className="card-text">{oneBook.price}€</p>
              ) : (
                ""
              )}
              <p className="card-text">{oneBook.genre}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BookCard;
