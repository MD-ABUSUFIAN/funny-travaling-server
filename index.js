const express=require('express');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const cors=require('cors');
const app = express();
const port=process.env.PORT ||5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0epdq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(cors());
app.use(express.json());


async function run(){
try{
    await client.connect();
    const database = client.db("Traveling");
    const serviceCollection = database.collection("Service"); 
    const ordersCollection = database.collection("Orders");


//    my orders post method part 

        app.post('/myorders',async(req,res)=>{
            console.log("hit the post api client site",req.body);
            const result = await ordersCollection.insertOne(req.body)
            res.send(result);
            console.log(result);
        });


    // Manager Order Get method
    app.get('/manageorders',async (req, res) => {

        const result=await ordersCollection.find({}).toArray();
        res.send(result)
        console.log(result);

    })










    app.post('/addnew',async(req,res)=>{
      
        const result = await serviceCollection.insertOne(req.body);
        res.send(result);
        console.log("hit the post api client site",req.body);


    });

        app.get('/services',async(req,res)=>{
        
        const result = await serviceCollection.find({}).toArray();
        res.send(result);
        // console.log(result);
      
      });

}

finally{
    // client.close();

}
}
 run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send("sarver site connected")
});

app.listen(port,()=>{
    console.log("listining connected this port",(port))
})