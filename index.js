const express = require('express')
const port = process.env.PORT||5000;
const cors = require('cors');
const app = express('cors');

// this is not acceptable for production only for learning seassion
app.use(cors({
    origin:"*",
}));

app.use(express.json());
// id assignment12 password :  KJjqjKDwqWEYUHUm
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://assignment12:KJjqjKDwqWEYUHUm@cluster0.iggngfh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

  try{
      await client.connect();
      const productCollection = client.db("assignment12").collection("products");

      app.get('/products', async(req, res)=>{
          const query ={};
          const cursor = productCollection.find(query);
          const products = await cursor.toArray();
          res.send(products);
      });

      // post product add a new product
      app.post('/products', async(req, res)=>{
        const newProduct = req.body;
        console.log('adding new product', newProduct );
        const result = await productCollection.insertOne(newProduct);
        res.send(result);
      } )
/* 
      // delet product from database and server
      app.delete('/product/:id', async(req, res) =>{
          const id = req.params.id;
          const query = {_id: ObjectId(id)};
          const result = await productCollection.deleteOne(query);
          res.send(result);
      });
 */
/* 
      // product update
      app.put('/product/:id', async(req, res) =>{
          
          const id = req.params.id;
          const updatedProduct = req.body;
          const filter = {_id: ObjectId()};
          const options = { upsert: true };

          const updatedDoc = {
              $set:{
                  // updatedProduct;
                  name: updatedProduct.name,
                  quantity: updatedProduct.quantity,
                  supplier: updatedProduct.supplier,
                  description: updatedProduct.description,
                  price: updatedProduct.price,
                  picture: updatedProduct.picture
              }
          };
          const result = await productCollection.updateOne(filter, updatedDoc, options);
          res.send(result)
      })
 */
  }finally{
      // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`assignment 12 Database is connected ${port}`)
})
