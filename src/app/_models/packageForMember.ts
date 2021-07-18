export interface PackageForMember {
    id: number;
    memberTypeId: number;
    name: string;
    transportMode: string;
    subscriptionType: string;
    counts: number;
    validity: number;
    balance: number;
    price: number;
    memberPackgeId: number;
    discountStartDate: string;
    discountEndDate: string;
    discountPercentage: number;
    discountDescription: string;
    discount?: boolean;
    actualPrice?: number;
}