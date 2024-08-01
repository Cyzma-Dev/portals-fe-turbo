import { Icons } from '@repo/ui/shadcn';
import { SideNavItem } from '..';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <Icons.home width="16" height="16" />,
  },
  {
    title: 'Patients',
    path: '/patients',
    icon: <Icons.userRound width="16" height="16" />,
  },
  // {
  //   title: 'Queues',
  //   path: '/queues',
  //   icon: <Icons.notebookPenIcon width="16" height="16" />,
  //   submenu: true,
  //   subMenuItems: [
  //     { title: 'Refill Requests', path: '/refill_request_report' },
  //   ],
  // },
  // {
  //   title: 'Reports',
  //   path: '/reports',
  //   icon: <Icons.notebookPenIcon width="16" height="16" />,
  //   submenu: true,
  //   subMenuItems: [
  //     { title: 'Expiring Rx', path: '/expiring_prescriptions_report' },
  //     { title: 'Expired Rx', path: '/expired_prescriptions_report' },
  //   ],
  // },
  // {
  //   title: 'Admin',
  //   path: '/admin',
  //   icon: <Icons.notebookPenIcon width="16" height="16" />,
  //   submenu: true,
  //   subMenuItems: [
  //     { title: 'Manage Pharmacy Users', path: '/manage-users' },
  //     { title: 'Manage Physicians Users', path: '/manage-physicians' },
  //   ],
  // },
  // {
  //   title: 'Manage Imports',
  //   path: '/manage-imports',
  //   icon: <Icons.notebookPenIcon width="16" height="16" />,
  //   submenu: true,
  //   subMenuItems: [
  //     { title: 'Patient Imports', path: '/patient-import-logs' },
  //     { title: 'RX Imports', path: '/rx-import-logs' },
  //   ],
  // },
  {
    title: 'Messages',
    path: '/pharmacy-messages',
    icon: <Icons.messageSquare width="16" height="16" />,
  },
  // {
  //   title: 'Inbound',
  //   path: '/inbound',
  //   icon: <Icons.messageSquare width="16" height="16" />,
  // },
  // {
  //   title: 'Outbound',
  //   path: '/outbound',
  //   icon: <Icons.messageSquare width="16" height="16" />,
  // },
  {
    title: 'Settings',
    path: '/settings',
    icon: <Icons.settings width="16" height="16" />,
  },
  // {
  //   title: 'Projects',
  //   path: '/projects',
  //   icon: <Icons.folder width="16" height="16" />,
  //   submenu: true,
  //   subMenuItems: [
  //     { title: 'All', path: '/projects' },
  //     { title: 'Web Design', path: '/projects/web-design' },
  //     { title: 'Graphic Design', path: '/projects/graphic-design' },

  //   ],
  // },
];
