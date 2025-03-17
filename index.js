const express = require("express");
const authMiddleware = require("./auth");
const app = express();
const PORT = 8443;

app.use(express.json());

// API END POINT, to get number addtion

app.post("/add-numbers", authMiddleware, (req, res, next) => {
  let { numberOne, numberTwo } = req.body;
  const num1 = parseInt(numberOne);
  const num2 = parseInt(numberTwo);

  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).json({
      success: false,
      result: "Not a valid input",
      statusCode: 400,
    });
  }

  try {
    res.status(200).json({
      success: true,
      result: num1 + num2,
    });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: message,
    statusCode,
  });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("Application throws error", err);
  } else {
    console.log(`Application Runs on http local, ${PORT}`);
  }
});
