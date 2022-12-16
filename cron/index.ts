import { cron } from '../deps.ts';
import { fetchAndStoreData } from './fetchAndStoreData.ts'

// 1am every day
cron('0 0 1 * * *', fetchAndStoreData);