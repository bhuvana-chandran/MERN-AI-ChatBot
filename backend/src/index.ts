import app from "./app.js";
import { connectToDataBase } from "./db/connection.js";

const PORT = process.env.PORT || 5000;
connectToDataBase()
  .then(() => {
    app.listen(PORT, () =>
      console.log("Server Connected to the PORT Successfully & Connected DataBase Successfully!")
    );
  })
  .catch((error) => console.log(error));
  
