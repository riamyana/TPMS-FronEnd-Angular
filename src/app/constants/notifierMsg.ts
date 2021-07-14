export class NotifierMsg {
    static SuccessUpdateMsg(data: string) {
        return `${data} updated Successfully`;
    }

    static SuccessAddMsg(data: string) {
        return `${data} added Successfully..!`;
    }

    static SuccessDeleteMsg(data: string) {
        return `${data} deleted Successfully..!`;
    }

    static ChangePasswordMsg(data: string) {
        return data == "success" ? "Password Changed Successfully" : "Old Password is incorrect..!";
    }

    static passMsg(data: string) {
        return data == "success" ? "Pass added Successfully" : "Problem in adding Pass..!";
    }

    static registerMsg(data: string) {
        return data == "success" ? "Registered Successfully..!" : "User Name alreday taken..! Please try other User Name.";
    }

    static memberProofNotFound(proofName: string) {
        return `No Proofs fround for type ${proofName}`;
    }

    static passRequest(status: string) {
        return status == "approve" ? "Pass Request Approved successfully..!" : "Pass Request Disapproved successfully..!";
    }

    static readonly errorMsg = `Something went wrong..! Please try again later.`;
    static readonly changePassword = `Password Updated Successfully..!`;
    static readonly otpErrorMsg = `Problem in sending OTP..! Please try again later`;
    static readonly invalidOTP = `Incorrect OTP..!`;
    static readonly noPassReq = `There is not pass request..!`;
}