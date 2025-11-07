//core module
require('dotenv').config();
const path=require('path');
const cors = require("cors");

//External module

const express=require('express');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
//==mongo url ==
const mongoUrl = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

//Local module
const rootdir=require('./utils/pathutils');
const errorcontroler=require("./controllers/error");
const todoRouter = require('./router/todoItemRouter');


//serever create
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.json());
app.use(express.static(path.join(rootdir,'public')));


app.use(cors({
  origin: ["https://todo.anubhavsingh.website"],
  credentials: true,
}));


app.use("/api/todo",todoRouter)
app.use(errorcontroler.errorpage);


mongoose.connect(mongoUrl).then(()=>{
  console.log("<========  mongoDb connect Successfully =======>");
  app.listen(port,()=>{
    console.log(`Server Running At http://localhost:${port}`);
  })
}).catch(err=>{
  console.log("Error while conniting mongoDb",err);
})
