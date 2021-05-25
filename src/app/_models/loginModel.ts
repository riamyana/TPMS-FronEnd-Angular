import { Roles } from './../constants/roles';
export class LoginModel {
    userName: string;
    role: Roles;
    constructor(userName: string, role: Roles) {
        this.userName = userName;
        this.role = role;
    }
}