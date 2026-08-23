import { MongoClient, type Db } from "mongodb";

const globalForMongo = globalThis as unknown as {
  mongoClient: MongoClient | undefined;
  mongoDb: Db | undefined;
};

const MONGO_URL =
  process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017";
const MONGO_DB = process.env.MONGODB_DB ?? "whi_sl";

let client: MongoClient;
let db: Db;

if (process.env.NODE_ENV === "development") {
  if (!globalForMongo.mongoClient) {
    client = new MongoClient(MONGO_URL);
    client.connect().catch(console.error);
    globalForMongo.mongoClient = client;
  }
  client = globalForMongo.mongoClient;
  db = client.db(MONGO_DB);
} else {
  client = new MongoClient(MONGO_URL);
  db = client.db(MONGO_DB);
}

export { db };
export type { Db };
