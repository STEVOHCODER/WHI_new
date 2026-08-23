import { MongoClient, type Db } from "mongodb";

const MONGO_URL =
  process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017";
const MONGO_DB = process.env.MONGODB_DB ?? "whi_sl";

let client: MongoClient;
let db: Db;

async function ensureConnected() {
  if (db) return db; // already connected

  if (!client) {
    client = new MongoClient(MONGO_URL);
  }

  // Connect (idempotent — safe to call multiple times)
  await client.connect();
  db = client.db(MONGO_DB);
  return db;
}

// Pre-connect in dev so the singleton is ready immediately.
// In production (serverless), each function warm-up connects on first request.
if (process.env.NODE_ENV === "development") {
  ensureConnected().catch(console.error);
}

export async function getDb() {
  return ensureConnected();
}

export type { Db };
