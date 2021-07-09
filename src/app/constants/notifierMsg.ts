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

    static registerMsg(data: string) {
        return data == "success" ? "Registered Successfully..!" : "User Name alreday taken..! Please try other User Name.";
    }

    static memberProofNotFound(proofName: string) {
        return `No Proofs fround for type ${proofName}`;
    }

    static readonly errorMsg = `Something went wrong...! Please try again later.`;
    static readonly changePassword = `Password Updated Successfully..!`;
}