import { mongo } from "deps.ts";
import { FetchedShorts } from "../types/index.ts";
import { mongoDb } from "../../mongodb/index.ts"

interface MongoFetchedShorts extends FetchedShorts {
  _id: mongo.ObjectId;
}

const dbFetchedShorts = mongoDb.collection<MongoFetchedShorts>('FetchedShorts');

export {
  dbFetchedShorts
}