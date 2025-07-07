import express from "express";

const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
  console.log("loaded the page");
  res.send("Server is ready!");
});

app.listen(PORT, () => console.log(`server is live http://localhost:${PORT}`));
