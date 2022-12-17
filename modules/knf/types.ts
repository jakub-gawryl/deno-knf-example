interface FetchedShortsRecord {
  belowThreshold: boolean;
  date: string;
  isin: string;
  name: string;
  paper: string;
  value: number;
}

interface FetchedShorts {
  items: FetchedShortsRecord[];
  lastUpdated: Date,
  totalShortValue: number;
}

export type {
  FetchedShorts,
  FetchedShortsRecord
}