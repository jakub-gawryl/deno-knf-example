import { opine, serveStatic } from "./deps.ts";
import { router } from "./router/index.ts";
import './cron/index.ts';
import { getLastRowFromDb } from "./helpers/getLastRowFromDb.ts";
import { fetchAndStoreData } from "./cron/fetchAndStoreData.ts";

const PORT = 8000;
const app = opine();

// Setup static dir
app.use(serveStatic('public'));

// Setup router
app.use('/', router);

// Check if DB is not empty
const { rows } = await getLastRowFromDb();
if (!rows?.length) {
  console.log('Save initial row to database');
  await fetchAndStoreData();
}

app.listen(PORT, () => {
  console.log(`Server started at http://127.0.0.1:${PORT}`)
});

