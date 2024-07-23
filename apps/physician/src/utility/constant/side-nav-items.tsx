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
  {
    title: 'Messages',
    path: '/messages',
    icon: <Icons.notebookPenIcon width="16" height="16" />,
  },
  {
    title: 'Inbound',
    path: '/inbound',
    icon: <Icons.messageSquare width="16" height="16" />,
  },
  {
    title: 'Outbound',
    path: '/outbound',
    icon: <Icons.settings width="16" height="16" />,
  },
  {
    title: 'RX Archive',
    path: '/rx-archive',
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
