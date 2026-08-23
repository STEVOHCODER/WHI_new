import { MongoClient, type Db } from "mongodb";

const MONGO_URL = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017";
const MONGO_DB = process.env.MONGODB_DB ?? "whi_sl";

let client: MongoClient | null = null;
let db: Db | null = null;
let connecting: Promise<Db> | null = null;
let connectError: Error | null = null;

async function ensureConnected(): Promise<Db> {
  if (connectError) throw connectError;
  if (db) return db;
  if (connecting) return connecting;

  connecting = (async () => {
    if (!client) {
      client = new MongoClient(MONGO_URL, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 10000,
        connectTimeoutMS: 10000,
      });
    }
    await client.connect();
    db = client.db(MONGO_DB);
    console.log("[mongo] connected to", MONGO_DB, "in", process.env.VERCEL_ENV ?? "unknown");
    return db;
  })();

  try {
    db = await connecting;
  } catch (err) {
    connectError = err as Error;
    connecting = null;
    throw err;
  } finally {
    connecting = null;
  }
  return db;
}

if (process.env.NODE_ENV === "development") {
  ensureConnected().catch((err) => console.error("[mongo] connect error:", err.message));
}

export async function getDb(): Promise<Db> {
  return ensureConnected();
}

export function getDbSafe(): { db: Db | null; error: Error | null } {
  if (connectError) return { db: null, error: connectError };
  return { db, error: null };
}

export type { Db };
