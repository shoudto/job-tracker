import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jobRoutes from "./routes/jobsRoutes.js";

dotenv.config();

const app = express();

app.use(cors()); // access from the front-end
app.use(express.json()); // accessing express and json format

app.use("/", jobRoutes);

// Set port and start server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port: ${PORT}`);
});

// Keep Node.js alive in ESM + Node 20+ to prevent early exit
setInterval(() => {}, 1000);
