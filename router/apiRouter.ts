import { Router } from "https://deno.land/x/opine@2.3.3/mod.ts";
import { getTotalShortValue } from "../helpers/index.ts";
import { dbClient } from '../db/index.ts';
import { ShortRecord } from "../types/index.ts";
import { getLastRowFromDb } from "../helpers/getLastRowFromDb.ts";

const apiRouter = Router();

const availableNameFilters = ['name', 'paper', 'date'] as const;
type AvailableNameFilters = typeof availableNameFilters[number]

const emptyResponse = {
  lastUpdated: null,
  totalShortValue: 0,
  items: []
};

/**
 * @path GET /api/short/list
 */
apiRouter.get('/short/list/:name?/:value?', async (req, res) => {
  // Retrive last data from database
  const { rows } = await getLastRowFromDb();

  if (!rows?.length) {
    return res.json(emptyResponse);
  }

  const result = JSON.parse(rows[0].data) as ShortRecord[];
  const lastUpdated = rows[0].created_at;

  const name = (req?.params?.name as AvailableNameFilters) || '';
  const value = req?.params?.value || '';

  if (name && availableNameFilters.includes(name) && value) {
    
    const filteredResult = result.filter(item => item[name] === value);

    return res.json({
      lastUpdated,
      totalShortValue: getTotalShortValue(filteredResult),
      items: filteredResult
    })
  }

  res.json({
    lastUpdated,
    totalShortValue: getTotalShortValue(result),
    items: result
  });
});


export {
  apiRouter
}