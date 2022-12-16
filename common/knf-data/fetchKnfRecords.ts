import { decodeKnfCsv, fetchKnfData } from "./helpers/index.ts";
import { FetchedShortsRecord } from "./types/index.ts";

const fetchKnfRecords = async (): Promise<FetchedShortsRecord[]> => {
  const data = await fetchKnfData(false);
  return await decodeKnfCsv(data);
};

export {
  fetchKnfRecords
}