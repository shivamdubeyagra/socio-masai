const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { postRouter } = require("./routes/post.routes");
// const { auth } = require("./middleware/auth.middleware");
const cors = require('cors')
require("dotenv").config();
const app = express();
app.use(cors())
app.use(express.json());

app.use("/users",userRouter);
app.use("/posts",postRouter);


app.listen(process.env.PORT,async()=>{
    try{
        await connection;
        console.log("Connected to mongoDB");
    }catch(error){
        console.log(error);
    }
    console.log(`server is running port at ${process.env.PORT}`);
});

