export interface MemberProfile {
    memberId?: number,
    userId: number,
    userName?: string,
    memberTypeId: number,
    memberTypeName?: string,
    firstName: string,
    lastName: string,
    gender: string,
    mobileNo: string,
    dob: string,
    profileImage?: string,
    requestDate: string,
    status?: number,
    description?: string
}