import AllInOneSDKManager from 'paytmpayments-allinone-react-native';

type StartPaytmTransactionParams = {
  amount: number;
  customerId: string;
  mobile: string;
};

type PaytmResult = {
  success: boolean;
  orderId?: string;
  txnId?: string;
  message?: string;
};

export const startPaytmTransaction = async (
//   params: StartPaytmTransactionParams
): Promise<PaytmResult> => {
  try {
    // const order = await createPaytmOrder({
    //   amount: params.amount.toFixed(2),
    //   customerId: params.customerId,
    //   mobile: params.mobile,
    // });

    const result = await AllInOneSDKManager.startTransaction(
        "123455665454",
      "CEINFO77819068383010",
      "token",
      "1.0",
      "https://domain.com",
      false,
      false,
      ""
    );

    if (result?.STATUS === 'TXN_SUCCESS') {
      return {
        success: true,
        orderId: "order.orderId",
        txnId: result.TXNID,
      };
    }

    return {
      success: false,
      message: result?.RESPMSG || 'Transaction failed',
    };
  } catch (err: any) {
    console.log("error paytm:",err);
    
    return {
      success: false,
      message: err?.message || 'Payment cancelled',
    };
  }
};
