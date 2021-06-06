import { MemberPackage } from './member-package';
export interface Package {
    id?: number;
    name: string;
    subscriptionType: number;
    counts: number;
    validity: number;
    balance: number;
    price: number;
    memberTypeName?: string;
}

export interface MemberTypePackageData{
    id?: number;
    name?: string;
    subscriptionType?: number;
    counts?: number;
    validity?: number;
    balance?: number;
    price?: number;
    memberTypeName?: string;
    memberTypePackages?: MemberPackage[];
}