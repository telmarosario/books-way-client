import "./Message.css";

function Message({ own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="message-top">
        <p className="message-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
        </p>
      </div>
      <div className="message-bottom">1 hour ago</div>
    </div>
  );
}

export default Message;
