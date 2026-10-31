import app from "./src/app.js";
import connectToDatabase from "./src/config/database.config.js";
import "dotenv/config";

const PORT = 5000;



connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});