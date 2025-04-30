//using express
const express=require("express");
const mongose=require('mongoose')
// create a instance of express..object
const app=express();
app.use(express.json())
//sample...to store item in memory
// let storeTodos=[]
// create new item todo
// app.get('/',(req,res)=>(res.send("hello,jack,hi")))
// mongodb connection
mongoose.connect('mongodb://localhost:27017/mern-app')
.then(()=>console.log("db connected"))
.catch((err)=>console.log(err))

// creating schema
const todoschema=new mongoose.Schema({
    tittle:String,
    description:String
})
//creating model
const todoModel=mongoose.model('Todo',todoschema)

app.post('/todos',async (req,res)=>{
   const {tittle,description} = req.body
// const newTodo={
//     id:storeTodos.length+1,
//     tittle,description
// }

// storeTodos.push(newTodo)
// console.log(storeTodos)
try{
    const newTodo=new todoModel({tittle,description});
    await newTodo.save()
    res.status(201).json(newTodo)
}
catch(error){
    console.log(error)
}
}
)
// get all items
app.get('/todos',(req,res)=>{
    res.json(storeTodos);
})
// start the serve
const port=4000;
app.listen(port,()=>console.log("server is listening to port"+" "+port))