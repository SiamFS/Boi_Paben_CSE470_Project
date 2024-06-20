const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// Middleware to connect frontend side
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// MongoDB configuration
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb'); 
const uri = "mongodb+srv://boi-paben:ky76U2dPmqMEIafT@cluster0.1sfia34.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // This URI will connect to the MongoDB server

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
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    const bookcollection = client.db("bookinventory").collection("books"); // Create a collection in the database

    // Inserting book data to the db: POST method
    app.post("/upload-book", async (req, res) => {
      const data = req.body;
      const result = await bookcollection.insertOne(data);
      res.send(result);
    });

    // Updating book in the database: PATCH method
    app.patch("/book/:id", async (req, res) => {
      const id = req.params.id;
      const updatedBookData = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...updatedBookData
        }
      };
      const result = await bookcollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // Deleting a book: DELETE method
    app.delete("/book/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await bookcollection.deleteOne(filter);
      res.send(result);
    });

    // Find books by category
    app.get("/allbooks/", async (req, res) => {
      let query = {};
      if (req.query?.category) {
        query = { category: req.query.category };
      }
      const result = await bookcollection.find(query).toArray();
      res.send(result);
    });

    // Get a single book data using URL parameter
    app.get("/book/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const filter = { _id: new ObjectId(id) };
        const result = await bookcollection.findOne(filter);
        if (!result) {
          res.status(404).send({ message: 'Book not found' });
          return;
        }
        res.send(result);
      } catch (error) {
        res.status(400).send({ message: 'Invalid ID format' });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close(); (so the connection will not close, commented this line)
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
