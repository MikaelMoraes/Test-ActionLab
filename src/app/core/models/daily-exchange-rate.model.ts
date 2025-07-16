export interface DailyExchangeRateItem {
  open: number;
  high: number;
  low: number;
  close: number;
  date: string; 
  closeDiffPercentage?: number;
}

export interface DailyExchangeRateResponse {
  data: DailyExchangeRateItem[];
  from: string;
  to: string;
  lastUpdatedAt: string;
  rateLimitExceeded: boolean;
  success: boolean;
}
