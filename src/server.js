const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  return res.json("teste");
});

const PORT = 3000;
app.listen(PORT, () => `Node running at PORT: ${ PORT }`);