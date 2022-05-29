const express = require("express");
const port = process.env.PORT || 5000;
const cors = require("cors");
const app = express("cors");
const ObjectId = require("mongodb").ObjectId;

// this is not acceptable for production only for learning seassion
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
// id assignment12 password :  KJjqjKDwqWEYUHUm
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://assignment12:KJjqjKDwqWEYUHUm@cluster0.iggngfh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const productCollection = client.db("assignment12").collection("products");
    const userCollection = client.db("assignment12").collection("users");
    // update user single product for updta product
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productCollection.findOne(query);
      res.send(result);
    });

    // get multiple product from server
    app.get("/products", async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });

    // for register / login user user
    app.put("/user/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updatedDoc = {
        $set: user,
      };
      const result = await userCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.post("/products", async (req, res) => {
      const newProduct = req.body;
      console.log("adding new product", newProduct);
      const result = await productCollection.insertOne(newProduct);
      res.send(result);
    });

    //Delet product from database and server
    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productCollection.deleteOne(query);
      res.send(result);
    });

    // product Update
    app.put("/product/:id", async (req, res) => {
      const id = req.params.id;
      const updatedProduct = req.body;
      const filter = { _id: ObjectId() };
      const options = { upsert: true };

      const updatedDoc = {
        $set: {
          // updatedProduct;
          name: updatedProduct.name,
          picture: updatedProduct.picture,
          price: updatedProduct.price,
          orderQty: updatedProduct.orderQty,
          minimumOrderQty: updatedProduct.minimumOrderQty,
          availableQty: updatedProduct.availableQty,
          description: updatedProduct.description,
        },
      };
      const result = await productCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`assignment 12 Database is connected ${port}`);
});
