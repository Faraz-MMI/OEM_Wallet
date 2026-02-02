import { CheckTransactionStatusRequest, CheckTransactionStatusResponse } from "../types/checkTransaction.types";
import { CreatePaytmOrderRequest, CreatePaytmOrderResponse } from "../types/createPaytmOrder.types";
import apiClient from "./apiClient";


export const createPaytmOrder = async (
    payload: CreatePaytmOrderRequest
): Promise<CreatePaytmOrderResponse> => {
    const { data } = await apiClient.post<CreatePaytmOrderResponse>(
        '/AddToWallet/InitiateTransaction',
        payload
    );
    return data;
};

export const checkTransactionStatus = async (
  payload: CheckTransactionStatusRequest
): Promise<CheckTransactionStatusResponse> => {
  const { data } = await apiClient.post<CheckTransactionStatusResponse>(
    '/AddToWallet/CheckTransactionStatus',
    payload
  );
  return data;
};
