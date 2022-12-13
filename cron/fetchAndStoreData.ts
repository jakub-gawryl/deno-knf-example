import { dbClient } from "../db/index.ts";
import { fetchKnfData } from "../helpers/fetchKnfData.ts";
import { decodeKnfCsv } from "../helpers/knfCsvDecoder.ts";
import { ShortRecord } from "../types/index.ts";

const fetchAndStoreData = async (): Promise<ShortRecord[]> => {
  if (!dbClient) {
    console.log("Database connection unavailable. 'fetchAndStoreData' cron task aborted");
    return [];
  }

  console.log(`[${new Date().toLocaleString('pl-PL')}] Getting fresh data from KNF...`);
  const data = await fetchKnfData(false);
  const result = await decodeKnfCsv(data);

  await dbClient.execute(`INSERT INTO fetches(data) values(?)`, [
    JSON.stringify(result)
  ]);
  console.log(`[${new Date().toLocaleString('pl-PL')}] Data stored in DB`);

  return result;
};

export {
  fetchAndStoreData
}