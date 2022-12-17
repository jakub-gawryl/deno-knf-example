import { _decodeKnfCsv } from "./src/_decodeKnfCsv.ts";
import { _fetchKnfData } from "./src/_fetchKnfData.ts";
import { FetchedShortsRecord } from "./types.ts";

const fetchKnfRecords = async (): Promise<FetchedShortsRecord[]> => {
  const data = await _fetchKnfData(false);
  return await _decodeKnfCsv(data);
};

export {
  fetchKnfRecords
}