export interface MemberPackage {
    id?: number;
    packageId?: number;
    memberTypeId: number;
    discountStartDate?: string;
    discountEndDate?: string;
    discountPercentage?: number;
    discountDescription?: string;
}