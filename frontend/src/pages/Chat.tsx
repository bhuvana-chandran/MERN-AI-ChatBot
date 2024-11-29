import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { useAuth } from "../context/AuthContext";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import red from "@mui/material/colors/red";
import ChatItem from "../components/chat/ChatItem";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import { IoMdSend } from "react-icons/io";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const navigate = useNavigate();
  const inputref = useRef<HTMLInputElement>(null);
  const auth = useAuth();
  const [chatmessages, setChatMessages] = useState<Message[]>([]);
  const handleSubmit = async () => {
    const content = inputref.current?.value?.trim() || ""; // Default to empty string
    if (!content) {
      console.warn("Input is empty!");
      return;
    }
    if (inputref.current) {
      inputref.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting Chats Faild", { id: "deletechats" });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded Chats", { id: "loadchats" });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Loading Faild", { id: "loadchats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: {
            md: "flex",
            xs: "none",
            sm: "none",
            flex: 0.2,
            flexDirection: "column",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0].toUpperCase()}
            {auth?.user?.name.split("")[1][0].toUpperCase()}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You're Having A Conversation With A CHATBOT
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            Looking for a quick answers or ideas ? I'm here to make things easy
            for you! start a conversation with me.
          </Typography>
          <Button
            onClick={handleDeleteChats}
            disabled={chatmessages.length === 0}
            variant="outlined"
            color="error"
            sx={{
              width: "200px",
              my: "auto",
              mx: "auto",
              fontWeight: 600,
              borderRadius: 3,
              ":hover": {
                bgcolor: red.A700,
                color: "white",
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: 500,
          }}
        >
          Model - GPT-3.5-turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatmessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "90%",
            padding: "20px",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
          }}
        >
          <Input
            inputRef={inputref}
            type="text"
            placeholder="Type your message..."
            disableUnderline
            sx={{
              width: "100%",
              bgcolor: "transparent",
              border: "none",
              outline: "none",
              color: "white",
            }}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{ ml: "auto", color: "white" }}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
