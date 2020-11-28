export interface IToast {
  toastMessage: string;
  toastType: string;
}

export interface IStockInfo {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': string;
  '4. Interval': string;
  '5. Output Size': string;
  '6. Time Zone': string;
}
export interface IStockStore {
  stockData: [];

  stockInfo: IStockInfo;
}
