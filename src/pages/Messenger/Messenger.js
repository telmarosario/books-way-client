import Message from "./../../components/Message/Message";
import Conversation from "../../components/Conversation/Conversation";
import "./Messenger.css";

function Messenger() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-3">
          <div className="chatmenu mt-5">
            <div className="chatmenu-wrapper">
              <h4>Your conversations</h4>
              <hr />
              <Conversation />
              <Conversation />
              <Conversation />
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-md-9">
          <div className="chatbox">
            <div className="chatbox-wrapper">
              <div className="chatbox-top">
                <Message />
                <Message own={true} />
                <Message />
                <Message />
                <Message />
                <Message />
              </div>

              <div className="chatbox-bottom mb-5">
                <textarea
                  placeholder="Say something nice"
                  className="chat-message-input"
                ></textarea>
                <button className="chat-submit-button">Send</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-0 col-md-0"></div>
      </div>
    </div>
  );
}

export default Messenger;
