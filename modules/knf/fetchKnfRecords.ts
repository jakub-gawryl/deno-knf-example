import { _decodeKnfCsv } from "./src/_decodeKnfCsv.ts";
import { _fetchKnfData } from "./src/_fetchKnfData.ts";
import { FetchedShortsRecord } from "./types.ts";

const fetchKnfRecords = async (): Promise<FetchedShortsRecord[]> => {
  const data = await _fetchKnfData(false);
  const docTypeFound = data.indexOf('<!DOCTYPE') > -1;
  
  if(docTypeFound) {
    console.log('No data fetched - Technical break possible on KNF page...');
    return [];
  }

  return await _decodeKnfCsv(data);
};

export {
  fetchKnfRecords
}