export interface GetTokenRequest {
  // No body params for this API
}

export interface GetTokenResponse {
  status: string;      
  data: string;        
  desc: string;        
  code: string;        
}

export interface GetBrandsRequest {
  // no body params
}

export interface GetBrandsResponse {
  status: string;   
  data: string;     
  desc: string;
  code: string;
}

export type Brands = any; 

export interface VoucherBrand {
  BrandProductCode: string;
  BrandName: string;
  Brandtype: string;

  RedemptionType: string | null;
  OnlineRedemptionUrl: string | null;
  BrandImage: string | null;

  denominationList: string;
  MinValue: string | number | null;
  MaxValue: string | number | null;
  DenomType: string;

  stockAvailable: 'true' | 'false' | boolean;
  Category: string;

  Descriptions: string | null;
  tnc: string | null;
  importantInstruction: string | null;
  redeemSteps: string | null;

  updated_at: string | null;
}

