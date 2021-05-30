import { Roles } from './roles';

export interface NavItem {
    displayName: string;
    disabled?: boolean;
    iconName: string;
    route?: string;
    children?: NavItem[];
}

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

export interface sideNav {
    nav: string;
    menu: Menu[];
}

export const sideNavMenu: sideNav[] = [
    {
        nav: 'Manage Member',
        menu: [
            { label: 'Manage Member Type', routerLink: 'admin/manage-member' },
            { label: 'Manage Proof', routerLink: 'admin/manage-proof' },
            { label: 'Manage Member Wise Proof', routerLink: '' }
        ]
    },
    {
        nav: 'Manage Package',
        menu: [
            { label: 'Manage Subscription Type', routerLink: '' },
            { label: 'Manage Package', routerLink: '' },
            { label: 'Manage Transport Mode', routerLink: '' },
            { label: 'Manage Member Wise Proof', routerLink: '' }
        ]
    }
]

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

export class SideNav {
    item: Menu[] = [];
    sideNav(nav: string): Menu[] {
        sideNavMenu.forEach((menuItem) => {
            if (menuItem.nav === nav) {
                this.item = [];
                menuItem.menu.forEach((menuItem) => {
                    this.item.push(menuItem);
                });
            } 
        });
        return this.item;
    }
}