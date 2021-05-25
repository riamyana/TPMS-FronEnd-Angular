import { Roles } from './roles';
export interface Menu {
    label: string;
    routerLink: string;
    active?: boolean;
}

export interface users {
    userType: Roles;
    menu: Menu[];
}

export const userMenu: users[] = [
    {
        userType: Roles.ADMIN,
        menu: [
            { label: 'Manage User', routerLink: '', active: true },
            { label: 'Manage', routerLink: '' },
            { label: 'Login', routerLink: 'admin/login', active: true }
        ]
    },
    {
        userType: Roles.USER,
        menu: [
            { label: 'Registration', routerLink: '' },
            { label: 'Manage Pass', routerLink: '' },
            { label: 'Login', routerLink: 'user/login', active: true }
        ]
    }
];

export class UserMenu {
    item: Menu[] = [];
    userMenu(user: Roles): Menu[] {
        userMenu.forEach((userMenuItem) => {
            if (userMenuItem.userType === user) {
                userMenuItem.menu.forEach((menuItem) => {
                    this.item.push(menuItem);
                });
            }
        });
        return this.item;
    }
}