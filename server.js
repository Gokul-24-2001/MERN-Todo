//using express
const express=require("express");
const mongoose=require('mongoose')
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
    tittle:{
        required:true,
        type:String
    },
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
        const {tittle,description} = req.body;
    const id=req.params.id;
       const updatedtodo=await todoModel.findByIdAndUpdate(id,{tittle,description},{new:id});
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
const port=4000;
app.listen(port,()=>console.log("server is listening to port"+" "+port))