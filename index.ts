// @deno-types="npm:@types/express"
import express from "npm:express@4.18.2";
import { fetchKnfData, parseShortRecords } from "./helpers/index.ts";

const PORT = 8000;
const app = express();

app.get('/', async (req, res) => {
  const data = await fetchKnfData(false);
  const result = await parseShortRecords(data);

  res.json(result.filter(record => record.paper = 'CDPROJEKT'));
});

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server started at http://127.0.0.1:${PORT}`)
});
