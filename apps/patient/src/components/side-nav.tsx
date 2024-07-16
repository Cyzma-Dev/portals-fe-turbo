import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Icons } from '@repo/ui/shadcn';
import { SIDENAV_ITEMS } from '../utility/constant/side-nav-items';
import { useTheme } from './useTheme';
import { SideNavItem } from '../utility';

const SideNav = () => {

  const { setTheme, theme } = useTheme();

  return (
    <div className='flex h-screen w-full'>
      <div
        style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
        className="md:w-60 min-w-fit max-w-fit bg-white flex-1 border-r border-zinc-200 hidden md:flex h-screen overflow-y-auto"
      >
        <div className="flex bg-background flex-col space-y-2 w-full">
          <div className="flex flex-row space-x-2 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 h-12 w-full">
            <Link to="/">
              <span className="h-4 w-4 bg-zinc-300 rounded-md" />
              <span className="font-bold text-xl text-foreground hidden md:flex">Logo</span>

              {/* <Button size={'icon'} onClick={() => setTheme("dark")}>
                      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    </Button>
                    <Button size={'icon'} onClick={() => setTheme("light")}>
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </Button> */}
            </Link>
            {theme == 'light'
              ?
              <Icons.sun
                className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                onClick={() => setTheme('dark')}
              />
              :
              <Icons.moon
                className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                onClick={() => setTheme('light')}
              />
            }
          </div>
          <div className="flex flex-col space-y-1 md:px-2 w-[12rem]">
            {SIDENAV_ITEMS.map((item: SideNavItem, idx: number) => {
              return <MenuItem key={idx} item={item} />;
            })}
          </div>
        </div>
      </div>
      <div
        className='overflow-y-auto flex-1 p-4'
      >
        <Outlet />
      </div>
    </div>
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
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-md hover:bg-blueBackground w-full justify-between hover:bg-blueBackground ${pathname.pathname.includes(item.path) ? 'bg-zinc-100' : ''}`}
          >
            <div className="flex flex-row space-x-3 items-center">
              {item.icon}
              <span className="font-medium text-sm flex">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? 'rotate-180' : ''} flex ml-8`}>
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
        </>
      ) : (
        <Link
          to={item.path}
          className={`flex flex-row space-x-3 items-center p-2 rounded-md hover:bg-blueBackground ${item.path === pathname.pathname ? 'bg-blueBackground text-blue' : ''
            }`}
        >
          {item.icon}
          <span className="font-medium text-sm flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
