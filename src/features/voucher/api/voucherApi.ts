import voucherAxiosClient from '../../../core/api/voucherAxiosClient';
import { GYFTR_BASE_URL } from '../../../core/config/env';
import { GetTokenResponse } from '../types';

export const voucherAuthApi = {
  getToken: async (): Promise<GetTokenResponse['data']> => {
    console.log("getting token 11");

    const { data } = await voucherAxiosClient.get<GetTokenResponse>(
      `/gettoken`,
      {
        headers: {
          'Content-Type': 'application/json',
          username: 'ZVBPNPCHVMBUAQTZYOWPLTXVWXWYERDS',
          password: ']soLj$si!x6IL![KP~rkQ^sXG^hT3yJS',
        },
      }
    );

    console.log("getting token 122",data);


    return data?.data;
  },
};
