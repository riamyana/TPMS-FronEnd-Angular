export interface MemberProfile {
    memberId?: number,
    userId: number,
    memberTypeId: number,
    memberTypeName?: string,
    firstName: string,
    lastName: string,
    gender: string,
    mobileNo: string,
    dob: string,
    profileImage?: string;
    status?: boolean;
}