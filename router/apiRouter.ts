import { Router } from "https://deno.land/x/opine@2.3.3/mod.ts";
import { fetchKnfData, decodeKnfCsv } from "../helpers/index.ts";
import { ShortRecord } from "../types/index.ts";

const apiRouter = Router();

// TODO - move to utils
const getTotalShortValue = (result: ShortRecord[]): number =>
  result.reduce((acc, item) => {
    acc += item.value * 100;
    return acc;
  }, 0) / 100;

const availableNameFilters = ['name', 'paper', 'date'] as const;
type AvailableNameFilters = typeof availableNameFilters[number]

/**
 * @path GET /api/short/list
 */
apiRouter.get('/short/list/:name?/:value?', async (req, res) => {
  const data = await fetchKnfData(false);
  const result = await decodeKnfCsv(data);

  const name = (req?.params?.name as AvailableNameFilters) || '';
  const value = req?.params?.value || '';

  if (name && availableNameFilters.includes(name) && value) {
    
    const filteredResult = result.filter(item => item[name] === value);

    return res.json({
      totalShortValue: getTotalShortValue(filteredResult),
      items: filteredResult
    })
  }

  res.json({
    totalShortValue: getTotalShortValue(result),
    items: result
  });
});


export {
  apiRouter
}