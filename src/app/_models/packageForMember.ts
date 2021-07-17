export interface PackageForMember {
    id: number;
    name: string;
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
}