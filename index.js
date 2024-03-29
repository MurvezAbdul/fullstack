const express = require("express");
const cors=require("cors");
const mysql=require("mysql")
const app=express();
const port=2000;
const bodyparser=require("body-parser")

//queries
const SELECT="select * from students";
//connection to sql
const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"murvezunnisa",
    database:"project_mysql"
})
connection.connect((err)=>{
    if(err){
        console.log("error ",err);
    }
    else
        console.log("connected")
})    

//cors middleware allows you to make requests from one website to another website in the browser
app.use(cors());

// bodyparser middleware It is responsible for parsing(transforming data) the incoming request bodies
//  in a middleware before you handle it

app.use(bodyparser.urlencoded({
    extended:true
}))
app.use(bodyparser.json())

//routes
app.get("/",function(req,res){
    res.send("go to /get route")
})

app.get("/retreive",(req,res)=>{
    connection.query(SELECT,(err,result)=>{
        if(err)
           return res.send(err)
        else 
           return res.json(result)
    })
})
//sending data using get method
// app.get("/add",(req,res)=>{
//     const {name,address,phonenumber}=req.query;
//     console.log(name,address,phonenumber);
//     const INSERT=`insert into students(name,address,phonenumber) values ("${name}","${address}","${phonenumber}")`;
//     connection.query(INSERT,(err,result)=>{
//         if(err)
//            console.log(err)
//         else  
//            res.send("data added successfully")   
//     })
// })

//using post
app.post("/add",(req,res)=>{
    console.log(req.body)
    const {name,address,phonenumber}=req.body;
    console.log(name,address,phonenumber);
    const INSERT=`insert into students(name,address,phonenumber) values ("${name}","${address}","${phonenumber}")`;
    connection.query(INSERT,(err,result)=>{
      if(err)
         console.log(err)
       else  
         res.send("data added successfully")   
    })
 })

app.get("/delete",(req,res)=>{
    const {id}=req.query;
    connection.query(`delete from students where id=${id}`,(err,result)=>{
        if(err)
        console.log(err)
     else 
        res.send("deleted successfully")
    })
       
})

//UPDATE table_name SET column1 = value1 WHERE condition;

app.put("/updatedata",(req,res)=>{
    const {id,name}=req.query;
    const update=`update employee set name="${name}" where id=${id}`;
    connection.query(update,(err,result)=>{
        if(err)
           return res.send(err)
        else
           return res.send("updated successfully")   
    })
})

 
app.listen(port,()=>console.log("server is running...."))



/* 
query when connection nont authorized 
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges*/