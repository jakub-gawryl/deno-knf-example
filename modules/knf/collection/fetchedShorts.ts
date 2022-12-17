import { mongo } from "deps.ts";
import { FetchedShorts } from "../types.ts";
import { mongoDb } from "../src/mongoDb.ts"

interface FetchedShortsCollection extends FetchedShorts {
  _id: mongo.ObjectId;
}

const fetchedShorts = mongoDb.collection<FetchedShortsCollection>('FetchedShorts');

export {
  fetchedShorts
}