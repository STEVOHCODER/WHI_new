import { MongoClient, ServerApiVersion, type Db } from "mongodb";

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
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 10000,
        connectTimeoutMS: 10000,
        tls: true,
        tlsAllowInvalidCertificates: false,
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

export async function getDbSafe(): Promise<{ db: Db | null; error: Error | null }> {
  if (connectError) return { db: null, error: connectError };
  if (db) return { db, error: null };
  try {
    const connectedDb = await ensureConnected();
    return { db: connectedDb, error: null };
  } catch (err) {
    return { db: null, error: err as Error };
  }
}

export type { Db };
