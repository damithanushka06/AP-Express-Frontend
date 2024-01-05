import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/home/dashboard',
    linkProps: {routerLinkActiveOptions: {exact: true}} ,
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Users',
    icon: 'fa fa-user',

    children: [
      {
        name: 'All Users',
        url: '/home/user/user-list',
        linkProps: {routerLinkActiveOptions: {exact: true}} ,
      },
      {
        name: 'Create User',
        url: '/home/user/user-create',
        linkProps: {routerLinkActiveOptions: {exact: true}} ,
      },
    ]
  },
  {
    name: 'Approval Groups',
    icon: 'fa fa-users',
    children: [
      {
        name: 'All Approval Groups',
        url: '/home/approval-group/group-list',
      },
      {
        name: 'Create Approval Group',
        url: '/home/approval-group/group-create',
      },
    ]
  },
  {
    name: 'Vendors',
    icon: 'fa fa-user-o',
    children: [
      {
        name: 'All Vendors',
        url: '/home/vendor/vendor-list'
      },
      {
        name: 'Create Vendor',
        url: '/home/vendor/vendor-create'
      },
    ]
  },
  {
    name: 'Items',
    icon: 'fa fa-sitemap',
    children: [
      {
        name: 'All Items',
        url: '/home/item/item-list'
      },
      {
        name: 'Create Item',
        url: '/home/item/item-create'
      },
    ],
  },
  {
    name: 'Accounts',
    icon:"fa fa-check-square-o",
    children: [
      {
        name: 'All Accounts',
        url: '/home/account/account-list'
      },
      {
        name: 'Create Account',
        url: '/home/account/account-create'
      },
    ],
  },
  {
    name: 'Purchase Orders',
    icon: 'fa fa-car',
    children: [
      {
        name: 'All Purchase Orders',
        url: '/home/po/po-list'
      },
      {
        name: 'Create PO',
        url: '/home/po/po-create'
      },
    ],
  },
  {
    name: 'PO Receipts',
    icon: 'fa fa-paper-plane-o',
    children: [
      {
        name: 'All POR',
        url: '/home/por/por-list'
      },
      {
        name: 'Create POR',
        url: '/home/por/por-create'
      },
    ],
  },
  {
    name: 'Bills',
    icon: 'fa fa-book',
    children: [
      {
        name: 'All Bills',
        url: '/home/bill/bill-list'
      },
      {
        name: 'Create Bill',
        url: '/home/bill/bill-create'
      },
    ],
  },
  {
    name: 'Payments',
    icon: 'fa fa-money',
    children: [
      {
        name: 'All Payments',
        url: '/home/payment/payment-list'
      },
      {
        name: 'Create Payment',
        url: '/home/payment/payment-create'
      },
    ],
  },
];
