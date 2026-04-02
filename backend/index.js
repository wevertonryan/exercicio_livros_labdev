import express from "express";
import cors from "cors";
import routes from "./routes/route.js"

const app = express();

app.use(express.json())

app.use(cors(
    {credentials: true, origin: "https://fictional-zebra-x5979qrrw4vxhwww-5173.app.github.dev"}
))

app.use("/biblioteca", routes);

app.listen(5000);
console.log("To ouvindo");