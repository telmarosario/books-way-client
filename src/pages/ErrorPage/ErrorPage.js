import img from "./error.png";

function ErrorPage() {
  return (
    <div>
      <h3 className="mt-5" style={{ color: "black" }}>
        404 This book is still being written
      </h3>
      <img className="img-fluid" src={img} alt="book writing" />
    </div>
  );
}

export default ErrorPage;
