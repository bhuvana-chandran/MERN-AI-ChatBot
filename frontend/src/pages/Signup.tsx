import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CustomizedInput from "../components/shared/CustomizedInput";
import Button from "@mui/material/Button";
import { IoIosLogIn } from "react-icons/io";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing Up!", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Signing Up Successfully", { id: "signup" });
    } catch (error) {
      console.log(error);
      toast.error("Signing Up Faild", { id: "signup" });
    }
  };
  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
    >
      <Box
        display={{ xs: "none", md: "flex" }}
        justifyContent="center"
        alignItems="center"
        flex={1}
        padding={{ md: 8 }}
      >
        <img
          src="ai-robot.png"
          alt="Robot"
          style={{
            maxWidth: "100%",
            height: "auto",
            width: "300px",
          }}
        />
      </Box>
      <Box
        display="flex"
        flex={1}
        justifyContent="center"
        alignItems="center"
        padding={{ xs: 2, md: 8 }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: "400px",
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            marginBottom={4}
            fontWeight={600}
          >
            SignUp
          </Typography>
          <CustomizedInput type="text" name="name" label="Name" />
          <CustomizedInput type="email" name="email" label="Email" />
          <CustomizedInput type="password" name="password" label="Password" />
          <Button
            type="submit"
            sx={{
              width: "100%",
              px: 2,
              py: 2,
              mt: 2,
              borderRadius: 2,
              backgroundColor: "#42a5f5",
              color: "white",
              ":hover": {
                backgroundColor: "#40c4ff",
                color: "white",
              },
            }}
            endIcon={<IoIosLogIn />}
          >
            SignUp
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default SignUp;
