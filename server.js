const mongoose = require("mongoose");
const app = require("./app");
require("dotenv/config");
// //Connect to DB
// mongoose.connect(
//   process.env.DB_CONNECTION_URL,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   () => {
//     console.log("connected to DB succesful");
//   }
// );

//listen
app.listen(8080, () => console.log("listening on port 8080"));
