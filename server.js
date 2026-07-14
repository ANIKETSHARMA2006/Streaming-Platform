import app from "./src/app.js";
import { connectDB } from "./src/db/db_conect.js";

connectDB()
  .then(
    app.listen(process.env.PORT || 8000, () => {
      console.log("THE SERVER IS UP AND RUNNING");
    }),
  )
  .catch((err) => {
    console.log(err);
  });
