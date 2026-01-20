export interface MobilePayload {
  countryCode?: number;
  value?: string;
  locale?: string | null;
}

export interface FetchCustomerRequest {
  mobile?: MobilePayload;
  panNumber?: string;
  pan?: string;
  dob?: string;
  cbsCifno?: string;
  kitNumber?: string;
  cardNumber?: string;
}

export type Customer = any;

export interface FetchCustomerResponse {
  result: Customer;
  pagination?: any;
}
