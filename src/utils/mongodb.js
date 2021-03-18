import {MongoClient} from 'mongodb'

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let cachedDb;
let cachedClient;
// Valores são let pois serão alterasdas durante a aplicação.


if(!uri) {
  throw new Error(
    'Please define the MONGODB_URI enviroment variable inside .env local',
  );
}

if(!dbName) {
  throw new Error(
    'Please define the MONGODB_URI enviroment variable inside .env local',
  );
}

export async function connectToDatabase(){
  if (cachedClient && cachedDb){
    return {client: cachedClient, db: cachedDb}
  }

  const client = await MongoClient.connect(uri,{
    useNewParser: true,
    useUnifiedTopology: true,
  });

  const db = await client.db(dbName);

  cachedClient = client;
  cachedDb =db;

  return {client, db};
}

export default connectToDatabase;