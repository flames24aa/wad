const dbConnect=require('./mongodb')
const express=require('express');
const app= express();
app.use(express.json())
//get API
app.get('/getdata',async(req,res)=>{
let result=await dbConnect();
result=await result.find().toArray();
res.send(result);
})
app.listen(3000);
//post API
app.post('/insertdata',async(req,res)=>{
    let result=await dbConnect();
    result=await result.insertOne(req.body);
    res.send("data inserted successfully")

})

//post API
app.put('/:name',async(req,res)=>{
    let result=await dbConnect();
    result=await result.updateOne({
        name:req.params.name},{$set:req.body});
    res.send("data updated successfully")
})
//delete API
app.delete('/:name',async(req,res)=>
{
    let result=await dbConnect();
    result=await result.deleteOne({name:req.params.name})
    res.send("data deleted successfully");
})


/*mongodb.js

const{MongoClient}=require('mongodb');
const url="mongodb://localhost:27017/"
//const database='student';
const client=new MongoClient(url);

async function dbConnect(){
    const result=await client.connect();
    const db=result.db('student');
    return db.collection('profile');
}
module.exports=dbConnect;

*/