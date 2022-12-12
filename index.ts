import { opine, serveStatic } from "https://deno.land/x/opine@2.3.3/mod.ts";
import { fetchKnfData, decodeKnfCsv } from "./helpers/index.ts";

const PORT = 8000;
const app = opine();

app.get('/', async (req, res) => {
  const data = await fetchKnfData(false);
  const result = await decodeKnfCsv(data);

  res.json(result.filter(record => record.paper = 'CDPROJEKT'));
});

app.use(serveStatic('public'));

app.listen(PORT, () => {
  console.log(`Server started at http://127.0.0.1:${PORT}`)
});

