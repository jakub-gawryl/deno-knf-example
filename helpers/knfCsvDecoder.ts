import { ShortRecord } from "../types/index.ts";

const COMMENT_CHAR = '#';
const COL_DELIMITER = ';';
const ROW_DELIMITER = '\n';

const removeComments = (input: string[]) => input.filter(item => item.charAt(0) !== COMMENT_CHAR);
const removeEmpty = (input: string[]) => input.filter(item => item);
const parseRow = (row: string): string[] => row.split(COL_DELIMITER).map(item => item.trim());

const decodeKnfCsv = (input: string): Promise<ShortRecord[]> => {
  return new Promise((resolve, reject) => {
    const rows = removeComments(removeEmpty(input.split(ROW_DELIMITER)));
    const cols = rows.map(row => parseRow(row));

    const shortRecords = cols.map((col): ShortRecord | null => {
      const [name, paper, isin, strVal, date] = col;
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
  });
};

export {
  decodeKnfCsv
}