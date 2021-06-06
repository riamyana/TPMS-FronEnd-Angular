export class NotifierMsg {
    static SuccessUpdateMsg(data: string) {
        return `${data} updated Successfully`;
    }

    static SuccessAddMsg(data: string) {
        return `${data} added Successfully`;
    }

    static SuccessDeleteMsg(data: string) {
        return `${data} deleted Successfully`;
    }

    static readonly errorMsg = `Something went wrong...! Please try again later.`;
}