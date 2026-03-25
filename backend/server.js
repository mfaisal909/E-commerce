const app = require("./app");
const connectDatabase = require("./db/Database");

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./backend/config/.env",
  });
}

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
