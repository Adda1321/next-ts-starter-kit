export interface CompanyInput {
  name: string;
  logo?: string;
  website?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  countryCode?: string;
}

export interface Company extends CompanyInput {
  id: string;
  createdAt: Date;
  createdByUserId: string;
  updatedAt?: Date;
  updatedByUserId?: string;
}
