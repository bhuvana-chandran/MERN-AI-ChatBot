import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password }, {
    withCredentials: true,
  });
  if (res.status !== 200) {
    throw new Error("Unable to Login");
  }
  return res.data;
};

export const signUpUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/signup", { name, email, password }, {
    withCredentials: true,
  });
  if (res.status !== 201) {
    throw new Error("Unable to SignUp");
  }
  return res.data;
};

export const checkAuthStatus = async () => {
  try {
    const res = await axios.get("/user/auth-status", {
      withCredentials: true,
    });
    if (res.status !== 200) {
      throw new Error("Unable to Authenticate");
    }
    return res.data;
  } catch (error) {
    console.error("Error checking authentication status:", error);
    throw error;
  }
};

export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/chat/new", { message }, {
    withCredentials: true,
  });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  return res.data;
};

export const getUserChats = async () => {
  const res = await axios.get("/chat/all-chats", {
    withCredentials: true,
  });
  if (res.status !== 200) {
    throw new Error("Unable to retrieve chats");
  }
  return res.data;
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete-chats", {
    withCredentials: true,
  });
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout", {
    withCredentials: true,
  });
  if (res.status !== 200) {
    throw new Error("Unable to Logout");
  }
  return res.data;
};
