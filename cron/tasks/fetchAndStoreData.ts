import { dbFetchedShorts, fetchKnfRecords, getTotalShortValue } from "../../local-deps.ts";

const fetchAndStoreData = async (): Promise<string> => {
  const result = await fetchKnfRecords();
  
  const resId = await dbFetchedShorts.insertOne({
    items: result,
    lastUpdated: new Date(),
    totalShortValue: getTotalShortValue(result)
  });

  return resId.toString();
};

export {
  fetchAndStoreData
}