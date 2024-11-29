import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CustomizedInput from "../components/shared/CustomizedInput";
import Button from "@mui/material/Button";
import { IoIosLogIn } from "react-icons/io";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing In!", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signing In Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Signing In Faild", { id: "login" });
    }
  };
  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);

  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      <Box padding={8} mt={10} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img
          src="ai-robot.png"
          alt="Robot"
          style={{ width: "400px", marginLeft: "20%" }}
        />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        padding={2}
        ml={"20%"}
        mt={10}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={4}
              fontWeight={600}
            >
              Login
            </Typography>
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 2,
                mt: 2,
                width: "400px",
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
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;