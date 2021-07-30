export interface EnrolledPackage {
    id?: number;
    passId: number;
    packageId?: number;
    name?: string;
    subscriptionType?: string;
    transportMode?: string;
    start?: string;
    end?: string;
    isActive: number;
    amount?: number;
}