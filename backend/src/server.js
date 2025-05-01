import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`✅ Server running on port ${PORT}`);
});

// process.on("uncaughtException", (err) => {
//   console.error("Uncaught Exception:", err);
//   process.exit(1); // Завершуємо процесс якщо сервер ліг, але процесс не завершився
// });
//
// process.on("unhandledRejection", (reason) => {
//   console.error("Unhandled Rejection:", reason);
//   process.exit(1);
// });
