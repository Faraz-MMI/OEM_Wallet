// import { API_BASE_URL } from '../constants/env';

// export type CreatePaytmOrderRequest = {
//   amount: string;
//   customerId: string;
//   mobile: string;
// };

// export type CreatePaytmOrderResponse = {
//   orderId: string;
//   mid: string;
//   txnToken: string;
//   amount: string;
// };

// export const createPaytmOrder = async (
//   payload: CreatePaytmOrderRequest
// ): Promise<CreatePaytmOrderResponse> => {
//   const res = await fetch(`${API_BASE_URL}/paytm/create-order`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload),
//   });

//   if (!res.ok) {
//     throw new Error('Failed to create Paytm order');
//   }

//   return res.json();
// };
