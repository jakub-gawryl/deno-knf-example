import { mongo } from "deps.ts"
import { mongoDb } from "@mongoDb"
import { FetchedShorts } from "../types.ts"

interface FetchedShortsCollection extends FetchedShorts {
  _id: mongo.ObjectId;
}

const fetchedShorts = mongoDb.collection<FetchedShortsCollection>('FetchedShorts');

export {
  fetchedShorts
}