import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Icons } from '@repo/ui/shadcn';
import { SIDENAV_ITEMS } from '../utility/constant/side-nav-items';
import { SideNavItem } from '../utility';
import HeaderBar from './header-bar';

const SideNav = () => {

  return (
    <>
      <HeaderBar />
      <div className='flex h-screen w-full'>
        <div
          style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
          className="md:w-60  min-w-fit max-w-fit bg-white flex-1 border-r border-muted-background hidden md:flex h-screen overflow-y-auto"
        >
          <div className="flex bg-background flex-col space-y-6 w-full pt-3">
            
            <div className="flex flex-col space-y-1 md:px-3">
              {SIDENAV_ITEMS.map((item: SideNavItem, idx: number) => {
                return <MenuItem key={idx} item={item} />;
              })}
            </div>
          </div>
        </div>
        <div
          className='overflow-y-auto flex-1 p-4 m-0'
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem; }) => {
  const pathname = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div>
      {item.submenu ? (
        <div className='min-w-[10rem]'>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-md hover:bg-blueBackground w-full justify-between hover:bg-blueBackground ${pathname.pathname.includes(item.path) ? 'bg-zinc-100' : ''
              }`}
          >
            <div className="flex flex-row space-x-3 items-center">
              {item.icon}
              <span className="font-medium text-sm flex">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? 'rotate-180' : ''} flex`}>
              <Icons.chevronDown width="16" height="16" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="ml-5 flex flex-col">
              {item.subMenuItems?.map((subItem:any, idx:any) => {
                return (
                  <Link
                    key={idx}
                    to={subItem.path}
                    className={`
                        ${subItem.path === pathname.pathname ? 'font-medium' : ''} 
                        hover:bg-blueBackground text-sm font-normal w-full p-2 pl-4 rounded-md flex justify-start items-center
                    `}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <Link
          to={item.path}
          className={`flex flex-row space-x-3 min-w-[10rem] items-center p-2 rounded-md hover:bg-blueBackground ${item.path === pathname.pathname ? 'bg-blueBackground text-blue' : ''
            }`}
        >
          {item.icon}
          <span className="font-medium text-sm flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
