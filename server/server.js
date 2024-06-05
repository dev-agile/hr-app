import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
import employeeRoutes from "./routes/employees.js";

app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "Content-Range");
  next();
});

app.use("/", employeeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
