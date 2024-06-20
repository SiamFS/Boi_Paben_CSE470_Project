const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors=require('cors')

//middleware to connect out forntend side
app.use(cors());
app.use(express.json());
//ky76U2dPmqMEIafT

app.get('/', (req, res) => {
  res.send('Hello World!')
})
// mongodb configuration

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb'); 
const uri = "mongodb+srv://boi-paben:ky76U2dPmqMEIafT@cluster0.1sfia34.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; //this uri will connect to the mongodb server

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const bookcollection = client.db("bookinventory").collection("books");// create a collection in the database
    //inserting book data to the db: post method
    app.post("/upload-book",async (req,res)=>{
      const data=req.body;
      const result= await bookcollection.insertOne(data);
      res.send(result);
    })
    //getting book from the database: get method
    //app.get("/allbooks",async (req,res)=>{
      //const books = await bookcollection.find();
      //const result= await books.toArray();
      //res.send(result);
    //})
    //updated book in the database: patch method
    app.patch("/book/:id",async (req,res)=>{
        const id=req.params.id;
        //console.log(id);
        const updatedBookData= req.body;
        const filter= {_id: new ObjectId(id)};
        const options = { upsert: true };
        const updateDoc = {
          $set: {
            ...updatedBookData
            }
        }
        const  result = await bookcollection.updateOne(filter, updateDoc, options);
        res.send(result);
    })
    //delete method
    app.delete("/book/:id",async (req,res)=>{
        const id=req.params.id;
        const filter = {_id: new ObjectId(id)};
        const result = await bookcollection.deleteOne(filter);
        res.send(result);
    })
    //find by category
    app.get("/allbooks/",async (req,res)=>{
      let query={};
      if(req.query?.category){
        query={category:req.query.category};
      }
      const result= await bookcollection.find(query).toArray();
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close(); (so the connection will not close for this commented this line)
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})