import { TypeAnimation } from "react-type-animation";


const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        "Hello! How can I help you today?",
        1500,
        "Ask me anything!",
        1500,
        "Looking for answers? I’m here to help.",
        1500,
        "Need assistance? Just type your question.",
        1500,
        "Let’s solve your problems together.",
        1500,
      ]}
      wrapper="span"
      speed={50}
      style={{
        fontSize: "40px",
        color: "white",
        textShadow: "1px 1px 20px #000",
        display: "inline-block",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnimation;
