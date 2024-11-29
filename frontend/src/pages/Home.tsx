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
          alignItems: "center",
          mx: "auto",
          mt: 20,
        }}
      >
        <Box>
          <TypingAnimation />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            gap: 5,
            position: "relative",
          }}
        >
          <Box
            style={{
              width: "500px",
              margin: "auto",
              position: "relative",
            }}
          >
            <img
              src="robot.png"
              alt="robot"
              style={{
                width: "100%",
                maskImage:
                  "linear-gradient(to right, transparent, black 45%, black 5%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 45%, black 5%, transparent)",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
