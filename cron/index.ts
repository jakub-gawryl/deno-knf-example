import { cron } from "deps.ts";
import { fetchAndStoreData } from "./tasks/fetchAndStoreData.ts"

console.log(`[${new Date().toLocaleString('pl-PL')}] CRON task manager started!`);

// 1am every day
cron('0 0 1 * * *', async () => {
  console.log(`[${new Date().toLocaleString('pl-PL')}] CRON task - getting fresh data from KNF...`);
  const resId = await fetchAndStoreData()
  console.log(`[${new Date().toLocaleString('pl-PL')}] CRON task - KNF data saved with id ${resId}!`);
});