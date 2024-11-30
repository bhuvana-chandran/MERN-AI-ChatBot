import TextField from "@mui/material/TextField";

type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin="normal"
      InputLabelProps={{ style: { color: "white" } }}
      name={props.name}
      label={props.label}
      type={props.type}
      InputProps={{
        style: {
          borderRadius: "10px",
          fontSize: "16px",
          color: "white",
        },
      }}
      sx={{
        width: { xs: "100%", sm: "80%", md: "400px" },
        maxWidth: "400px",
      }}
    />
  );
};

export default CustomizedInput;
