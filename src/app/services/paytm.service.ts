import AllInOneSDKManager from 'paytmpayments-allinone-react-native';
// import { createPaytmOrder } from '../../core/api/payments.api';
// import { useUserStore } from '../store/userStore';

type StartPaytmTransactionParams = {
  amount: number;
  orderId: string;
  txnToken: string;
  // customerId: string;
  // mobile: string;
};

type PaytmResult = {
  success: boolean;
  orderId?: string;
  txnId?: string;
  message?: string;
};

export const startPaytmTransaction = async (
  params: StartPaytmTransactionParams
): Promise<PaytmResult> => {
  try {
    // const user = useUserStore.getState().userProfile;
    // const order = await createPaytmOrder({
    //   website: 'mapmyindia.com',
    //   txnAmount: params.amount.toFixed(2),
    //   userName: "OEM_" + user?.mobile || "",
    //   firstName:user?.fname || "",
    //   lastName:user?.lname || "",
    //   mobile: user?.mobile || "",
    // });

    const result = await AllInOneSDKManager.startTransaction(
      params.orderId,
      "CEINFO77819068383010",
      params.txnToken,
      params.amount.toFixed(2),
      "mapmyindia.com",
      false,
      false,
      ""
    );

    console.log("paytm transaction status", result);
    if (result?.STATUS === 'TXN_SUCCESS') {
      return {
        success: true,
        orderId: result?.ORDERID,
        txnId: result.TXNID,
      };
    }

    console.log("paytm transaction failed", result);


    return {
      success: false,
      message: result?.RESPMSG || 'Transaction failed',
    };
  } catch (err: any) {
    console.log("error paytm:", err);

    return {
      success: false,
      message: err?.message || 'Payment cancelled',
    };
  }
};
