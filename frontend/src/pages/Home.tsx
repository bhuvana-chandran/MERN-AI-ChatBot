import Box from "@mui/material/Box";
import TypingAnimation from "../components/typer/TypingAnimation";

const Home = () => {
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          textAlign: "center",
          mx: "auto",
          mt: 20,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: 5,
            position: "relative",
            justifyContent: "center",
          }}
        >
          <img
            src="robot.png"
            alt="robot"
            style={{
              width: "500px",
              margin: "auto",
              maskImage:
                "linear-gradient(to right, transparent, black 45%, black 5%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 45%, black 5%, transparent)",
            }}
          />
        </Box>
        <Box>
          <TypingAnimation />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
