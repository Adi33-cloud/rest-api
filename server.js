const app = require("./app");

//listen
app.listen(process.env.LISTENING_PORT, () =>
  console.log(`listening on port ${process.env.LISTENING_PORT}`)
);
