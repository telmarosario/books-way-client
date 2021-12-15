import "./AboutUs.css";

function AboutUs() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-0 col-md-2"></div>
          <div className="col-sm-12 col-md-8">
            <h4 className="mt-5 mb-4">About BooksWay</h4>
            <p className="custom-about-us">
              BooksWay is a book selling and trading web application. You can
              add the books and mark if they are up for sale or for trade! If
              you change your mind you can always edit it later.
            </p>
            <p className="custom-about-us">
              You can search by books you are looking for or take a peak at your
              favorite genre. When you see a book you like, contact the person
              who published the post!
            </p>
            <p className="custom-about-us">
              This full-stack web application was developed by Telma Rosário on
              the final project at Ironhack's Bootcamp. On the frontend, it uses
              React.js, JavaScript and Bootstrap. On the backend, it uses
              Node.js, Express.js, MongoDB and Mongoose.
            </p>
            <p className="custom-about-us mb-5">
              Take a look at{" "}
              <a
                href="https://github.com/telmarosario/books-way-client"
                target="_blank"
                rel="noreferrer"
              >
                BooksWay repo on Github
              </a>{" "}
              and at{" "}
              <a
                href="https://github.com/telmarosario"
                target="_blank"
                rel="noreferrer"
              >
                Telma's profile
              </a>
              .
            </p>
            <div className="col-sm-0 col-md-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
