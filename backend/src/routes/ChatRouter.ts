import { Router } from "express";
import { verifyToken } from "../utils/jwt-token-generator.js";
import { chatCompletionvalidator, validate } from "../utils/validator.js";
import { DeleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/ChatControllers.js";


const ChatRouters = Router();

// only authenticated and authorized users can access
ChatRouters.post("/new", validate(chatCompletionvalidator), verifyToken, generateChatCompletion );
ChatRouters.get("/all-chats", verifyToken, sendChatsToUser );
ChatRouters.delete("/delete-chats", verifyToken, DeleteChats );


export default ChatRouters;