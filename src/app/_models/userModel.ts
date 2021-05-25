import { Roles } from './../constants/roles';
export class UserModel {
    id: number;
    userName: string;
    // password: string;
    role: Roles;
    jwtToken?: string;

    set setRole(role: Roles) {
        this.role = role;
    }  
}