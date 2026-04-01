import express from "express";
import cors from "cors";
import routes from "./routes/route.js"

const app = express();

app.use(express.json())

app.use(cors(
    {credentials: true, origin: "http://localhost:5173"}
))

app.use("/biblioteca", routes);

app.listen(5000);
console.log("To ouvindo");