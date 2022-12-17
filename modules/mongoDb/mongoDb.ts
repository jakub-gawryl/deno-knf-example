import { mongo } from "deps.ts";
import { config } from "config.ts";

const mongoClient = new mongo.MongoClient();

await mongoClient.connect(config.mongo.connectionStr);
const mongoDb = mongoClient.database(config.mongo.dbName);

export {
  mongoDb
}