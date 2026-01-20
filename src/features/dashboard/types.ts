// src/features/wallet/types.ts

export interface WalletAccount {
  version: number;
  accountType: string;
  accountNumber: string;
  accountBalance: string; // API returns balance as string (e.g. "1599.0")
  productFkey: number;
  accountCurrency: number; // numeric currency code (e.g. 356 for INR)
  defaultAcct: boolean;
  lienBalance: number;
  accountStatus: string;
  lastFinancialTxnTime: string; // ISO datetime
}

export interface WalletBalance {
  result: {
    wallets: WalletAccount[];
  };
  pagination?: any | null;
}

export interface WalletTransaction {
  id: string;
  title: string;
  amount: number;
  type: 'DEBIT' | 'CREDIT';
  createdAt: string;
}

export interface WalletState {
  balance: WalletBalance | null;
  transactions: WalletTransaction[];
  loading: boolean;
  error?: string;
}
