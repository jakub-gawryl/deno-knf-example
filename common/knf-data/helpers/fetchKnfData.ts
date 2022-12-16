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

export {
  fetchKnfData
}