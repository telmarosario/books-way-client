import Message from "./../../components/Message/Message";
import Conversation from "../../components/Conversation/Conversation";
import "./Messenger.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import chatService from "../../services/chat.service";

function Messenger() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const scrollRef = useRef();

  const fetchConversations = async () => {
    try {
      const response = await chatService.getAllConversations(user._id);
      setConversations(response.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await chatService.getMessagesFromConvo(currentChat._id);
      setMessages(response.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const handleNewMessage = (e) => {
    setNewMessage(e.target.value);
    console.log(newMessage);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const messageObj = {
        sender: user._id,
        text: newMessage,
        conversationId: currentChat._id,
      };
      const response = await chatService.createMessage(messageObj);
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

  useEffect(() => {
    if (currentChat) {
      fetchMessages();
    }
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-3">
          <div className="chatmenu mt-5">
            <div className="chatmenu-wrapper">
              <h4>Your conversations</h4>
              {errorMessage && <p>{errorMessage}</p>}
              <hr />
              {conversations.map((oneConvo) => {
                return (
                  <div onClick={() => setCurrentChat(oneConvo)}>
                    <Conversation
                      key={oneConvo._id}
                      conversation={oneConvo}
                      currentUser={user}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-md-9">
          <div className="chatbox">
            <div className="chatbox-wrapper">
              {currentChat ? (
                <div>
                  <div className="chatbox-top">
                    {messages &&
                      messages.map((oneMessage) => {
                        return (
                          <div ref={scrollRef}>
                            <Message
                              message={oneMessage}
                              own={oneMessage.sender === user._id}
                            />
                          </div>
                        );
                      })}
                  </div>

                  <div className="chatbox-bottom mb-5">
                    <textarea
                      placeholder="Say something nice"
                      className="chat-message-input"
                      onChange={handleNewMessage}
                      value={newMessage}
                    ></textarea>
                    <button
                      className="chat-submit-button"
                      onClick={handleSubmit}
                    >
                      Send
                    </button>
                  </div>
                </div>
              ) : (
                <span>Open a conversation</span>
              )}
            </div>
          </div>
        </div>
        <div className="col-sm-0 col-md-0"></div>
      </div>
    </div>
  );
}

export default Messenger;
