export interface UserProfile {
  userId: number;
  title: string;
  fname: string;
  lname: string;
  mobile: string;
  email: string;
  userType: 'USR' | 'ADM' | string;
  isActive: 0 | 1;
  walletBal: number;
  dob: string | null;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface GetProfileResponse {
  status: boolean;
  message: string;
  data: UserProfile;
}
