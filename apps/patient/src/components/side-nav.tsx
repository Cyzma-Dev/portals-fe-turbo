import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Icons, SideNavToggleBtn } from '@repo/ui/shadcn';
import { SIDENAV_ITEMS } from '../utility/constant/side-nav-items';
import { SideNavItem } from '../utility';
import HeaderBar from './header-bar';
import clsx from 'clsx';

const SideNav = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const sideNavRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Define the media query
    const mediaQuery = window.matchMedia('(min-width: 640px)'); // Tailwind's 'sm' breakpoint is 640px

    // Define the handler function
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
        setIsSmallScreen(!e.matches);
        setCollapsed(true)
    };

    // Attach the event listener
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Check the initial screen size
    setIsSmallScreen(!mediaQuery.matches);
    setCollapsed(!mediaQuery.matches);

    // Cleanup function to remove the event listener
    return () => {
        mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSmallScreen && sideNavRef.current && !sideNavRef.current.contains(event.target as Node)) {
        setCollapsed(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSmallScreen]);


  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div className='flex h-screen w-full relative'>
        <div
          ref={sideNavRef}
          style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
          className={clsx('md:w-60 min-w-fit max-w-fit bg-white z-50 flex-1 border-r border-muted-background absolute sm:static h-screen overflow-y-auto', {
            'md:flex' : !collapsed,
            'hidden' : collapsed
          })}
        >
          <div className="flex bg-background flex-col gap-4 w-[14rem] h-full">
            <div className='flex gap-4 items-center min-w-[8rem] h-16 p-3 border-b border-muted-background hidden sm:flex'>
              <img src="png/alera-logo.png" alt="Loading" className='object-cover h-6' />
              <div className='w-full flex justify-between items-center text-xl font-bold '>
                Aleracare
                <SideNavToggleBtn
                  toggleCollapse={toggleCollapse}
                  collapsed={collapsed}
                  children={<Icons.panelLeftClose className='h-5 w-5' />}
                  className='hover:bg-blueBackground hover:text-blue p-1 w-fit h-fit rounded-md cursor-pointer'
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1 px-4">
              <div className='h-16 flex items-center sm:hidden'>
                <SideNavToggleBtn
                  toggleCollapse={toggleCollapse}
                  collapsed={collapsed}
                  children={<Icons.panelLeftClose className='h-5 w-5' />}
                  className={clsx('hover:bg-blueBackground hover:text-blue p-1 w-fit h-fit rounded-md cursor-pointer',
                    {'hidden' : collapsed}
                  )}
                />
              </div>
              {SIDENAV_ITEMS.map((item: SideNavItem, idx: number) => {
                return <MenuItem key={idx} item={item} />;
              })}
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full h-full overflow-auto'>
          <HeaderBar 
            collapsed={collapsed}
            toggleCollapse={toggleCollapse}
          />
          <div className='overflow-y-auto flex-1 h-full p-4 m-0'>
            <Outlet />
          </div>
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
            className={`flex flex-row items-center p-2 rounded-md hover:bg-blueBackground w-full justify-between hover:bg-blueBackground ${pathname.pathname.includes(item.path) ? 'bg-zinc-100' : '' }`}
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
