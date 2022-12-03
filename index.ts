// @deno-types="npm:@types/express"
import express from "npm:express@4.18.2";

const app = express();

app.get('/', (req, res) => {
  console.log(req);

  res.json({
    hello: 'World'
  })
});

app.use(express.static('public'));

app.listen(8000, () => {
  console.log('Workin!')
});