const app = require("./app");

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, World!" });
});

// Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception: ", err.message);
  console.log("Closing server now...");
  process.exit(1);
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`),
);

// Uncaught Rejection
process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("Closing server now...");
  server.close(() => {
    process.exit(1);
  });
});
