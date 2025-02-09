import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());

app.use(express.json());

app.use("/api", router);

app.get("/",(req,res)=>{
    res.json({
        message:"Server is running!"
    })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




