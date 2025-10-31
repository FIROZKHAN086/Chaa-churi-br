
import mongoose from 'mongoose';


const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(process.env.MONGO_URI, clientOptions);
   
   
  } 
  catch (e) {
    console.error(e);
  }
}


export default run;