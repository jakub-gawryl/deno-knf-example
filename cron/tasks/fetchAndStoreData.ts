import { fetchedShorts } from '@knf/collection/fetchedShorts.ts'
import { fetchKnfRecords } from '@knf/fetchKnfRecords.ts'
import { getTotalShortValue } from '@knf/utils/getTotalShortValue.ts'

const fetchAndStoreData = async (): Promise<string> => {
  const result = await fetchKnfRecords();
  
  const resId = await fetchedShorts.insertOne({
    items: result,
    lastUpdated: new Date(),
    totalShortValue: getTotalShortValue(result)
  });

  return resId.toString();
};

export {
  fetchAndStoreData
}