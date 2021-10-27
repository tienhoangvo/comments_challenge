if (process.env.NODE_ENV !== "production") {
  const { config } = require("dotenv");
  config({ path: "./.env" });
}

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log(">>>Database connected  ...");
  });

const port = process.env.PORT;

const app = require("./app");

const server = app.listen(port, () => {
  console.log(`>>>App running on port ${port}...`);
});
