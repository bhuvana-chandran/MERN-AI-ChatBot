import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        marginLeft: "50px",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <Link to={"/"}>
        <img
          src="openai.png"
          alt="openAi"
          width={"35px"}
          height={"35px"}
          className="image-inverted rotate-image"
        />
      </Link>
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          fontWeight: "400",
          textShadow: "2px 2px 20px #000",
        }}
      >
        <span style={{ fontSize: "25px", letterSpacing: 2 }}>CHAT-AI</span> -
        OpenAi
      </Typography>
    </div>
  );
};

export default Logo;
