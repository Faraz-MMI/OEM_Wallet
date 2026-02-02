export type CreatePaytmOrderRequest = {
    website: string;
    txnAmount: string;
    userName: string;
    firstName: string;
    lastName: string;
    mobile: string;
};


export interface CreatePaytmOrderResponse {
    status: boolean;
    result: CreatePaytmOrderResult;
}

export interface CreatePaytmOrderResult {
    order_id: string;
    head: OrderHead;
    body: OrderHeadBody;
}

export interface OrderHead {
    responseTimestamp: string;
    version: string;           
    clientId: string | null;
    signature: string;
}

export interface OrderHeadBody {
    resultInfo: ResultInfo;
    txnToken: string;
    isPromoCodeValid: boolean;
    authenticated: boolean;
}

export interface ResultInfo {
    resultStatus: 'S' | 'F' | string;
    resultCode: string; 
    resultMsg: string;
}
