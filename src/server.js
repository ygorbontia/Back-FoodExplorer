require("express-async-errors");
const AppError = require("./utils/AppError");

const express = require("express");
const app = express();
app.use(express.json());

const uploadConfig = require("./configs/upload");
app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER));

const routes = require("./routes");
app.use(routes);

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message
    });
  };

  console.log(err)

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error"
  });
});

const PORT = 3000;
app.listen(PORT, () => `Node running at PORT: ${ PORT }`);