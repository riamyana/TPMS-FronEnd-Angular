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
    icon?: string;
}

export interface users {
    userType: Roles;
    menu: Menu[];
}

export const userMenu: users[] = [
    {
        userType: Roles.ADMIN,
        menu: [
            // { label: 'Home', routerLink: '/admin/dashboard', active: true },
            // { label: 'Manage User', routerLink: '/admin', active: true },
            { label: 'Manage', routerLink: '/admin/manage', active: true },
            { label: 'Login', routerLink: '/admin/login', active: false }
        ]
    },
    {
        userType: Roles.USER,
        menu: [
            { label: 'View Packages', routerLink: '/user/view-package', active: true },
            { label: 'Buy Package', routerLink: '/user/package', active: true },
            { label: 'Request Pass', routerLink: '/user/pass-request', active: true },
            { label: 'My Profile', routerLink: '/user/my-profile', active: true },
            // { label: 'Manage Package', routerLink: '', active: true },
            // { label: 'View History', routerLink: '', active: true },
            { label: 'Login', routerLink: '/user/login', active: false },
            { label: 'Register', routerLink: '/user/register', active: false }
        ]
    }
];

export interface sideNav2 {
    userType?: Roles;
    label: string;
    disabled?: boolean;
    icon?: string;
    routerLink: string;
    children?: sideNav2[];
}

export const sideNavMenu2: sideNav2[] = [
    {
        userType: Roles.ADMIN,
        label: 'Manage Member',
        icon: 'people',
        routerLink: 'manage-member',
        children: [
            {
                label: 'Manage Member Type',
                routerLink: 'manage-member',
            }, {
                label: 'Manage Proof',
                routerLink: 'manage-proof'
            },
            {
                label: 'Manage Member Proof Requirement',
                routerLink: 'manage-proof-requirement'
            }
        ]
    },
    {
        userType: Roles.ADMIN,
        label: 'Manage Package',
        icon: 'inventory_2',
        routerLink: 'manage-transport-modes',
        children: [
            {
                label: 'Manage Transport Mode',
                routerLink: 'manage-transport-modes',
            }, {
                label: 'Manage Package',
                routerLink: 'manage-package'
            }
        ]
    },
    {
        userType: Roles.ADMIN,
        label: 'Manage Routes',
        icon: 'transfer_within_a_station',
        routerLink: 'manage-station',
        children: [
            {
                label: 'Manage Stations',
                routerLink: 'manage-station',
            }, {
                label: 'Manage Transport Cost',
                routerLink: 'manage-transport-cost'
            }
        ]
    },
    {
        userType: Roles.ADMIN,
        label: 'Manage Pass Request',
        icon: 'thumbs_up_down',
        routerLink: 'pass-request'
    },
    {
        userType: Roles.ADMIN,
        label: 'Profile',
        icon: 'person',
        routerLink: 'my-profile'
    }
];
export interface sideNav {
    nav: string;
    menu: Menu[];
}

export const sideNavMenu: sideNav[] = [

    {
        nav: 'Manage',
        menu: [
            { label: 'Profile', routerLink: '', icon: 'person' },
            { label: 'Manage Member', routerLink: '', icon: 'people' },
            { label: 'Manage Package', routerLink: '', icon: 'local_mall' }
        ]
    },
    {
        nav: 'Manage Member',
        menu: [
            { label: 'Manage Member Type', routerLink: 'manage-member', icon: 'people' },
            { label: 'Manage Proof', routerLink: 'manage-proof', icon: 'description' },
            { label: 'Manage Member Wise Proof', routerLink: 'manage-proof', icon: 'contact_page' }
        ]
    },
    {
        nav: 'Manage Package',
        menu: [
            { label: 'Manage Transport Mode', routerLink: 'manage-transport-modes' },
            { label: 'Manage Package', routerLink: 'manage-package' }
            // { label: 'Manage Member Wise Proof', routerLink: '' }
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