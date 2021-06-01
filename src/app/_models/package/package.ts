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