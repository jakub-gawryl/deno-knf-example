import { config } from "../../common/config/index.ts";
import { Router } from "../../deps.ts";
import { dbFetchedShorts, fetchKnfRecords, getTotalShortValue } from "../../local-deps.ts";

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
  const lastRow = await dbFetchedShorts.findOne({}, {
    sort: {
      lastUpdated: -1
    }
  })

  if (!lastRow) {
    return res.json(emptyResponse);
  }

  const { items, lastUpdated } = lastRow;

  const name = (req?.params?.name as AvailableNameFilters) || '';
  const value = req?.params?.value || '';

  if (name && availableNameFilters.includes(name) && value) {
    
    const filteredResult = items.filter(item => item[name] === value);

    return res.json({
      lastUpdated,
      totalShortValue: getTotalShortValue(filteredResult),
      items: filteredResult
    })
  }

  res.json({
    lastUpdated,
    totalShortValue: getTotalShortValue(items),
    items: items
  });
});

/**
 * @path GET /api/latest
 */
apiRouter.get('/latest/:saveKey?', async (req, res) => {
  const result = await fetchKnfRecords();

  const saveKey = req?.params?.saveKey || '';

  if (saveKey.length > 0 &&  saveKey === config.utils.saveKey) {
    await dbFetchedShorts.insertOne({
      items: result,
      lastUpdated: new Date(),
      totalShortValue: getTotalShortValue(result)
    });
  }

  res.json(result);
});


export {
  apiRouter
}