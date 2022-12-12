import { opine, serveStatic } from "https://deno.land/x/opine@2.3.3/mod.ts";
import { router } from "./router/index.ts";

const PORT = 8000;
const app = opine();

// Setup static dir
app.use(serveStatic('public'));

// Setup router
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server started at http://127.0.0.1:${PORT}`)
});

