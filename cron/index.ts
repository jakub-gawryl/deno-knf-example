import { cron } from 'https://deno.land/x/deno_cron/cron.ts';
import { fetchAndStoreData } from './fetchAndStoreData.ts'

// 1am every day
cron('0 0 1 * * *', fetchAndStoreData);