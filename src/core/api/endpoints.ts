export const ENDPOINTS = {
  AUTH: {
    SEND_OTP: '/auth/send-otp',
    VERIFY_OTP: '/auth/verify-otp',
    LOGIN: '/auth/login',
  },
  CUSTOMER:{
    FETCH_CUSTOMER:'/v1/customers/fetch'
  },

  WALLET: {
    BALANCE: '/v1/wallets/balance',
    TRANSACTIONS: '/v1/wallets/transactions',
  },

  TRANSACTIONS: {
    FETCH_ALL: '/v1/transactions/fetch-all',
  },

  PAYMENT: {
    PROCESS: '/payment/process',
    CAPTURE: '/payment/capture',
    VOID: '/payment/void',
  },

  RFID: {
    DETAILS: '/rfid/details',
  },

  FASTAG: {
    DETAILS: '/fastag/details',
    RECHARGE: '/fastag/recharge',
  },

  GYFTR: {
    CATEGORIES: '/gyftr/categories',
    VOUCHERS: '/gyftr/vouchers',
    PURCHASE: '/gyftr/purchase',
  },
} as const;
