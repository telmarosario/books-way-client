function ErrorCard({ errorMessage }) {
  return (
    <div>
      <div class="alert alert-warning d-flex align-items-center" role="alert">
        <svg
          class="bi flex-shrink-0 me-2"
          width="24"
          height="24"
          role="img"
          aria-label="Warning:"
        >
          <use xlink:href="#exclamation-triangle-fill" />
        </svg>
        <div>{errorMessage}</div>
      </div>
    </div>
  );
}

export default ErrorCard;
