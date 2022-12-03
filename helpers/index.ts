import { parse } from 'npm:csv-parse';

type ShortRecord = {
  name: string;
  paper: string;
  isin: string;
  value: number;
  date: string;
  belowThreshold: boolean;
};

const knfHost = "https://rss.knf.gov.pl/RssOuterView/TXTServ";

const fetchKnfData = (
  historicalData = true,
  issuerName = '',
  fetchFunc = null
) => {
  const fetcher = fetchFunc || fetch;

  const params = {
    lang: 'EN',
    history: historicalData,
    orderByField: 'issuerName',
    orderByDesc: false,
    filterByIssuerName: issuerName || ''
  };

  let paramsArr: string[] = [];

  for (const [key, value] of Object.entries(params)) {
    paramsArr.push(`${key}=${value}`);
  }

  const url = `${knfHost}?${paramsArr.join('&')}`;

  return fetcher(url).then(resp => resp.text());
};

const parseShortRecords = (inputStr = ''): Promise<ShortRecord[]> => {
  let shortRecords: (ShortRecord | null)[];

  return new Promise((resolve, reject) => {
    if (!inputStr) {
      reject('Input string cannot be empty');
    }

    parse(
      inputStr,
      {
        delimiter: ';',
        comment: '#'
      },
      (err, records: string[]) => {
        if (err) {
          return {};
          // Below error is not visible in the console?
          // reject(`CVS parse error: ${err.message}`);
        }

        shortRecords = records.map((record): ShortRecord | null => {
          const [name, paper, isin, strVal, date] = record;
          const value = +(strVal).replace(',', '.');
          const belowThreshold = strVal.charAt(0) === '<';

          if (!belowThreshold && Number.isNaN(value)) {
            return null;
          }

          return {
            name,
            paper,
            isin,
            value: value || 0,
            date,
            belowThreshold
          };
        });

        resolve(shortRecords.filter((item: ShortRecord | null) => item) as ShortRecord[]);
      }
    );
  });
};

export {
  fetchKnfData,
  parseShortRecords
}