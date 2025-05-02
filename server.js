//using express
const express=require("express");
const mongoose=require('mongoose')
const cors=require("cors")
// create a instance of express..object
const app=express();
app.use(express.json())
app.use(cors())
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
    title:{
        required:true,
        type:String
    },
    description:String
})
//creating model
const todoModel=mongoose.model('Todo',todoschema)

app.post('/todos',async (req,res)=>{
   const {title,description} = req.body;
// const newTodo={
//     id:storeTodos.length+1,
//     tittle,description
// }

// storeTodos.push(newTodo)
// console.log(storeTodos)
try{
    const newTodo=new todoModel({title,description});
    await newTodo.save()
    res.status(201).json(newTodo)
}
catch(error){
    console.log(error);
    res.status(500).json({message:error.message});
}
}
)
// get all items
app.get('/todos',async (req,res)=>{
    try{
      const todos= await todoModel.find();
      res.json(todos);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:error.message});
    }
})
//update the todos
app.put('/todos/:id',async (req,res)=>{
    try{
        const {title,description} = req.body;
    const id=req.params.id;
       const updatedtodo=await todoModel.findByIdAndUpdate(id,{title,description},{new:true});
       // if given 'id' is not find in database
       if(!updatedtodo){
        return res.status(404).json({message:"Todo is not found"})
       }
       res.status(200).json(updatedtodo)

    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})
// delete item from database
app.delete('/todos/:id', async(req,res)=>{
try{
    const id=req.params.id;
 const deleteitem=await todoModel.findByIdAndDelete(id);
 res.status(204).end()
}
catch(error){
    console.log(error)
    res.status(500).json({message:error.message});
}
})

// start the serve
const port=8000;
app.listen(port,()=>console.log("server is listening to port"+" "+port))