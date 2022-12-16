import { opine, serveStatic } from "../deps.ts";
import { router } from "./router/index.ts";

const PORT = 8000;
const app = opine();

// Setup static dir
app.use(serveStatic('web/public'));

// Setup router
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server started at http://127.0.0.1:${PORT}`)
});

