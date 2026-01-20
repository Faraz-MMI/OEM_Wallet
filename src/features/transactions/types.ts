export interface MobilePayload {
  countryCode?: number;
  value?: string;
  locale?: string | null;
}

export interface FetchTransactionsRequest {
  mobile?: MobilePayload;
  kit?: string;
  entityId?: string;
  fromDate?: string; // format as required by API
  toDate?: string;
}

export interface TransactionItem {
  accountCurrencyCode: string;
  accountCurrencyCodeName: string;
  accountNo: string;

  baseConvertedAmount: string;
  baseConversionRate: string;

  extTxnId: string;
  intTxnId: string;

  time: string; // ISO datetime string

  amount: string;
  transactionAmount: string;

  txRef: string;
  transactionStatus: "SUCCESS" | "FAILED" | "PENDING";

  preBalance: string;
  postBalance: string;

  transactionType: "LOAD" | "DEBIT" | "CREDIT";
  txnOrigin: "web" | "app" | string;

  externalTransactionId: string;

  retrievalReferenceNo: string;
  retrivalReferenceNo: string; // API typo retained

  authCode: string;

  convertedAmount: number;

  kitNo: string;

  transactionCurrencyCode: string;
  transactionCurrencyCodeName: string;

  exchangeRate: number;

  markupServiceTax: number;
  markupRate: number;
  markUpAmount: number;
  markUpServiceTaxAmount: number;

  txnFees: number;
  serviceTax: number;

  crDr: "C" | "D";

  prepaidWallet: {
    walletName: string;
    walletType: string;
  };

  nationalServiceTax: number;
  regionalServiceTax: number;
  specialRegionalServiceTax: number;
  integratedServiceTax: number;

  forwardingInstitutionId: string;

  additionalDescription?: {
    prepaid?: {
      fee: string;
      feeType: string;
    };
  };
}

export interface FetchTransactionsResponse {
  result: TransactionItem[];
  pagination?: {
    list: boolean;
    pageSize: number;
    pageNo: number;
    totalPages: number;
    totalElements: number;
  };
}

