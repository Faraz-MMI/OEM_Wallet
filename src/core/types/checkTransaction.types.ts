export interface CheckTransactionStatusRequest {
  order_id: string;
}

export interface CheckTransactionStatusResponse {
  status: boolean;
  result: CheckTransactionStatusResult;
}

export interface CheckTransactionStatusResult {
  head: TransactionHead;
  body: TransactionStatusBody;
}

export interface TransactionHead {
  responseTimestamp: string;
  version: string;
  clientId: string | null;
  signature: string;
}

export interface TransactionStatusBody {
  resultInfo: ResultInfo;

  txnId: string;
  bankTxnId: string | null;
  orderId: string;
  txnAmount: string;
  txnType: string;

  gatewayName: string | null;
  bankName: string | null;
  mid: string;
  paymentMode: string | null;

  refundAmt: string;
  txnDate: string;
  authRefId: string | null;
}

export interface ResultInfo {
  resultStatus: string; // TXN_SUCCESS | TXN_FAILURE | PENDING
  resultCode: string;
  resultMsg: string;
}
