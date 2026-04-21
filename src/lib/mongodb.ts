import mongoose from "mongoose"

type MongooseCache = {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongooseCache: MongooseCache | undefined
}

const cached = global.mongooseCache ?? { conn: null, promise: null }

if (!global.mongooseCache) {
  global.mongooseCache = cached
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn
  }

  const mongoUri = process.env.MONGODB_URI
  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI environment variable")
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoUri, {
      dbName: process.env.MONGODB_DB_NAME,
      maxPoolSize: 10,
      minPoolSize: 0,
      serverSelectionTimeoutMS: 5000,
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}
