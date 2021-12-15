import "./Message.css";

//* See library for formating dates

function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="message-top">
        <p className="message-text">{message.text}</p>
      </div>
      <div className="message-bottom">{message.createdAt}</div>
    </div>
  );
}

export default Message;
