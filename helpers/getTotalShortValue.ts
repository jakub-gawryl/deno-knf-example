import { ShortRecord } from "../types/index.ts";

const getTotalShortValue = (result: ShortRecord[]): number =>
  result.reduce((acc, item) => {
    acc += item.value * 100;
    return acc;
  }, 0) / 100;

  export {
    getTotalShortValue
  }