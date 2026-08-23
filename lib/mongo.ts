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
      // Use tls=true for Atlas; reduce compression to avoid TLS issues
      const url = MONGO_URL.replace("mongodb+srv://", "mongodb+srv://").replace(/\?/, "?tls=true&");
      client = new MongoClient(url, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 10000,
        connectTimeoutMS: 10000,
        tls: true,
        tlsAllowInvalidCertificates: false,
        // Reduce memory usage in serverless
        maxPoolSize: 5,
        minPoolSize: 1,
      });
    }
    await client.connect();
    db = client.db(MONGO_DB);
    console.log("[mongo] connected to", MONGO_DB);
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
  if (!db) return { db: null, error: new Error("MongoDB connection has not been established yet") };
  return { db, error: null };
}

export type { Db };
