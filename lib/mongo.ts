import { MongoClient, type Db } from "mongodb";

const MONGO_URL =
  process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017";
const MONGO_DB = process.env.MONGODB_DB ?? "whi_sl";

let client: MongoClient | null = null;
let db: Db | null = null;
let connecting: Promise<Db> | null = null;

async function ensureConnected(): Promise<Db> {
  if (db) return db;
  if (connecting) return connecting;

  connecting = (async () => {
    if (!client) {
      client = new MongoClient(MONGO_URL, {
        // Give connections more time in serverless environments
        serverSelectionTimeoutMS: 15000,
        socketTimeoutMS: 15000,
      });
    }
    await client.connect();
    db = client.db(MONGO_DB);
    return db;
  })();

  try {
    db = await connecting;
  } finally {
    connecting = null;
  }
  return db;
}

// Pre-connect in dev so the singleton is ready immediately.
if (process.env.NODE_ENV === "development") {
  ensureConnected().catch((err) => console.error("[mongo] connect error:", err.message));
}

export async function getDb(): Promise<Db> {
  return ensureConnected();
}

export type { Db };
