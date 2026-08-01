import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI || 'mongodb+srv://cadpointsalem001_db_user:cadpoint123@cadpoint.vrrgzz8.mongodb.net/?appName=cadpoint';
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

export async function getDb() {
  const connectedClient = await clientPromise;
  return connectedClient.db('cadpoint');
}
