import axios from "axios";

class ChatService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  // POST /api/chat/conversation
  createConversation = async (requestBody) => {
    return this.api.post("/api/chat/conversation", requestBody);
  };

  // GET /api/chat/conversation/:userId
  getAllConversations = async (userId) => {
    return this.api.get(`/api/chat/conversation/${userId}`);
  };

  // GET /api/chat/message
  createMessage = async (requestBody) => {
    return this.api.post(`/api/chat/message`, requestBody);
  };

  // GET   /api/chat/message/:conversationId
  getMessagesFromConvo = async (conversationId) => {
    return this.api.get(`/api/chat/message/${conversationId}`);
  };
}

// Create one instance of the service
const chatService = new ChatService();

export default chatService;
