import { Roles } from './../constants/roles';
export class UserModel {
    id: number;
    userName: string;
    email: string;
    role: Roles;
    jwtToken?: string;

    set setRole(role: Roles) {
        this.role = role;
    }  
}