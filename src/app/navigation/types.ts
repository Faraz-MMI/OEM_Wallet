import { NavigatorScreenParams } from "@react-navigation/native";
import { Routes } from "../constants/routes";
import { VoucherBrand } from "../../features/voucher/types";

export type MainStack = {
  [Routes.DASHBOARD]: undefined;
  [Routes.RFID_CARD]: undefined;
  [Routes.ADD_MONEY]: undefined;
  [Routes.ALERTS]: undefined;
  [Routes.PROFILE_STACK]: NavigatorScreenParams<ProfileStackParamList>;

  [Routes.PAYMENT_SUCCESS]: {
    amount: number;
  };

  [Routes.FASTTAG_STACK]: NavigatorScreenParams<FastTagStackParamList>;
  [Routes.VEHICLE_STACK]: NavigatorScreenParams<VehicleStackParamList>;
  [Routes.VOUCHER_STACK]: NavigatorScreenParams<VoucherStackParamList>;
  [Routes.HOME_VIEW_ALL_TRANSACTIONS]: undefined;
  [Routes.TRANSACTION_DETAILS]: {
    transactionId: string;
  };
};

export type FastTagStackParamList = {
  [Routes.FASTTAG_HOME]: undefined;
  [Routes.FASTTAG_ADD_BALANCE]: undefined;
  [Routes.REVIEW_PAYMENT]: undefined;
  [Routes.FASTTAG_SUCCESS]: undefined;
  [Routes.FASTTAG_HISTORY]: undefined;
  [Routes.FASTTAG_PAYMENT_HISTORY]: undefined;
  [Routes.FASTTAG_BUY]: undefined;
  [Routes.FASTTAG_BUY_NEW_FASTTAG]: undefined;
  [Routes.FASTTAG_SELECT_BANK]: undefined;
  [Routes.FASTTAG_ENTER_VEHICLE_NUMBER]: undefined;
  [Routes.FASTTAG_FOUND]: undefined;
  [Routes.FASTTAG_PURCHASE_SUCCESS]: undefined;
  [Routes.FASTTAG_LINK_SUCCESS]: undefined;
};

export type VehicleStackParamList = {
  [Routes.VEHICLE_HOME]: undefined;
  [Routes.VEHICLE_EV_CHARGING]: undefined;
  [Routes.VEHICLE_FUEL_PAYMENT]: undefined;
  [Routes.VEHICLE_SERVICE_HISTORY]: undefined;
  [Routes.MY_EV_RFID_CARD]: undefined;
  [Routes.EV_CHARGING_VIEW]: undefined;
  [Routes.EV_CHARGE_COMPLETED]:undefined;
  [Routes.EV_CHARGING_DETAILS]:undefined;
  [Routes.EV_CHARGING_HISTORY]:undefined;
};

export type VoucherStackParamList = {
  [Routes.VOUCHER_HOME]: undefined;
  [Routes.VOUCHER_BY_BRAND]: {
    brand: VoucherBrand;
  };
  [Routes.VOUCHER_DETAILS]: {
    voucherId: string;
  };
  [Routes.COMPLETE_VOUCHER_PURCHASE]: undefined;
  [Routes.VOUCHER_PURCHASE_SUCCESS]: undefined;
};

export type ProfileStackParamList = {
  [Routes.PROFILE_SETTINGS]: undefined;
  [Routes.PROFILE_EDIT]: undefined;
  [Routes.PROFILE_SECURITY]: undefined;
  [Routes.PROFILE_PAYMENT_METHODS]: undefined;
  [Routes.PROFILE_WALLET_PIN]: undefined;
  [Routes.PROFILE_HELP]: undefined;
  [Routes.PROFILE_CUSTOMER_LOOKUP]: undefined;
};