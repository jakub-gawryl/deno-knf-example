import { FetchedShortsRecord } from "../types.ts";

const getTotalShortValue = (result: FetchedShortsRecord[]): number =>
  result.reduce((acc, item) => {
    acc += item.value * 100;
    return acc;
  }, 0) / 100;

  export {
    getTotalShortValue
  }