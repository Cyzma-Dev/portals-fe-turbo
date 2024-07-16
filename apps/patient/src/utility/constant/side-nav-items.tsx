import { Icons } from '@repo/ui/shadcn';
import { SideNavItem } from '..';


export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    path: '/',
    icon: <Icons.home width="16" height="16" />,
  },
  {
    title: 'Account Info',
    path: '/account-info',
    icon: <Icons.userRound width="16" height="16" />,
  },
  {
    title: 'Notes',
    path: '/patient-notes',
    icon: <Icons.notebookPenIcon width="16" height="16" />,
  },
  {
    title: 'Messages',
    path: '/patient-messages',
    icon: <Icons.messageSquare width="16" height="16" />,
  },
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
