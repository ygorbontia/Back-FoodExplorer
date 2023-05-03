require("express-async-errors");
const cors = require("cors");
const AppError = require("./utils/AppError");
const express = require("express");
const uploadConfig = require("./configs/upload");
const routes = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER));
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