const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

// Middleware to connect frontend side
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// MongoDB configuration
const uri = "mongodb+srv://boi-paben:ky76U2dPmqMEIafT@cluster0.1sfia34.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const bookCollection = client.db("bookinventory").collection("books");
    const blogCollection = client.db("blog").collection("posts");

    // Blog routes
    app.post('/posts/create', async (req, res) => {
      try {
        const newPost = req.body;
        const result = await blogCollection.insertOne(newPost);
        if (result.insertedId) {
          const insertedPost = await blogCollection.findOne({ _id: result.insertedId });
          res.status(201).send(insertedPost);
        } else {
          res.status(500).send({ error: 'Failed to create post' });
        }
      } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send({ error: 'Error creating post' });
      }
    });

    app.get('/posts', async (req, res) => {
      try {
        const posts = await blogCollection.find({}).toArray();
        res.status(200).send(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send({ error: 'Error fetching posts' });
      }
    });

    app.post('/posts/:id/comments', async (req, res) => {
      try {
        const postId = req.params.id;
        const newComment = req.body;
        const filter = { _id: new ObjectId(postId) };
        const updateDoc = { $push: { comments: newComment } };
        const result = await blogCollection.updateOne(filter, updateDoc);
        if (result.modifiedCount === 1) {
          const updatedPost = await blogCollection.findOne(filter);
          res.status(201).send(updatedPost);
        } else {
          res.status(500).send({ error: 'Failed to add comment' });
        }
      } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).send({ error: 'Error adding comment' });
      }
    });

    app.post('/posts/:id/like', async (req, res) => {
      try {
        const postId = req.params.id;
        const filter = { _id: new ObjectId(postId) };
        const updateDoc = { $inc: { likes: 1 } };
        await blogCollection.updateOne(filter, updateDoc);
        res.status(200).send({ message: 'Post liked' });
      } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).send({ error: 'Error liking post' });
      }
    });

    app.post('/posts/:id/dislike', async (req, res) => {
      try {
        const postId = req.params.id;
        const filter = { _id: new ObjectId(postId) };
        const updateDoc = { $inc: { dislikes: 1 } };
        await blogCollection.updateOne(filter, updateDoc);
        res.status(200).send({ message: 'Post disliked' });
      } catch (error) {
        console.error('Error disliking post:', error);
        res.status(500).send({ error: 'Error disliking post' });
      }
    });

    app.post("/upload-book", async (req, res) => {
      const data = req.body;
      try {
        const result = await bookCollection.insertOne(data);
        res.status(200).json({
          message: 'Book uploaded successfully',
          result: result
        });
      } catch (error) {
        res.status(500).json({
          message: 'Failed to upload book',
          error: error.message
        });
      }
    });
    
   
    //Find by email
    app.get("/book/email/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      try {
        const result = await bookCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).json({ message: error.message });
     }
    });

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
      const result = await bookCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    app.delete("/book/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const result = await bookCollection.deleteOne(filter);
  if (result.deletedCount === 1) {
    res.status(200).json({ success: true, message: 'Book Deleted Successfully' });
  } else {
    res.status(404).json({ success: false, message: "Book Delete Failed" });
  }
});
app.delete("/book/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const result = await bookCollection.deleteOne(filter);
  if (result.deletedCount === 1) {
    res.status(200).json({ success: true, message: 'Book Deleted Successfully' });
  } else {
    res.status(404).json({ success: false, message: 'Book Not Found' });
  }
});


    app.get("/allbooks/", async (req, res) => {
      let query = {};
      if (req.query?.category) {
        query = { category: req.query.category };
      }
      const result = await bookCollection.find(query).toArray();
      res.send(result);
    });
    app.get('/wishlist', async (req, res) => {
            let query = {}
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const result = await wishlistCollection.find(query).toArray()
            res.send(result)
        })

        app.get('/wishlist/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const booking = await wishlistCollection.findOne(query)
            res.send(booking)
        })


        app.post('/wishlist', async (req, res) => {
            const user = req.body;
            const result = await wishlistCollection.insertOne(user)
            res.send(result)
        })

    app.get("/search/:title", async (req, res) => {
      const title = req.params.title;
      const query = { bookTitle: { $regex: title, $options: 'i' } };
      const result = await bookCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/book/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const filter = { _id: new ObjectId(id) };
        const result = await bookCollection.findOne(filter);
        if (!result) {
          res.status(404).send({ message: 'Book not found' });
          return;
        }
        res.send(result);
      } catch (error) {
        res.status(400).send({ message: 'Invalid ID format' });
      }
    });

    app.get("/books/sort/price", async (req, res) => {
      const { order } = req.query;
      const sortOrder = order === 'desc' ? -1 : 1;
      const result = await bookCollection.find().sort({ Price: sortOrder }).toArray();
      res.send(result);
    });

    app.get("/books/category/:category", async (req, res) => {
      const category = req.params.category;
      const query = { category };
      const result = await bookCollection.find(query).toArray();
      res.send(result);
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Add any cleanup code here if needed
  }
}
run().catch(console.dir);
