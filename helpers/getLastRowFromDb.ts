import { dbClient } from "../db/index.ts";

const getLastRowFromDb = async () => {
  if (!dbClient) {
    return {
      rows: null
    };
  }

  return await dbClient.execute('SELECT * FROM fetches ORDER BY created_at DESC LIMIT 1');
};

export {
  getLastRowFromDb
}