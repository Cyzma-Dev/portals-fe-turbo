import { AuthHook, logoutService, PharmacyContext } from '@repo/common/common-library';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, Icons, SideNavToggleBtn } from '@repo/ui/shadcn'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useTheme } from './useTheme';
import clsx from 'clsx';

interface IHeaderBar {
    collapsed: boolean
    toggleCollapse: () => void
}

function HeaderBar(props: IHeaderBar) {
    const { pharmacy_data } = useContext(PharmacyContext)
    const { logout: authLogout } = AuthHook();
    const navigate = useNavigate();
    const { setTheme, theme } = useTheme();
    const logout = async () => {
        try {
            await logoutService.logout();
            toast.success('Logout Successfully')

        } catch (error: any) {
            error?.data?.details && toast.error(error?.data?.details)
        } finally {
            authLogout && authLogout();
            navigate('/login');
            localStorage.clear();
        }
    };

    return (
        <div className={clsx('flex justify-end border-b border-muted-background h-16 px-4 items-center',
            {'justify-between': props.collapsed}
        )}>
            {/* <div
                onClick={props.toggleCollapse}
                className={clsx('hover:bg-blueBackground hover:text-blue p-1 w-fit h-fit rounded-md cursor-pointer',
                    {'hidden' : !props.collapsed}
                )}
            >
                <Icons.panelLeftOpen className='h-5 w-5' />
            </div> */}
            <SideNavToggleBtn
                toggleCollapse={props.toggleCollapse}
                collapsed={props.collapsed}
                children={<Icons.panelLeftOpen className='h-5 w-5' />}
                className={clsx('hover:bg-blueBackground hover:text-blue p-1 w-fit h-fit rounded-md cursor-pointer',
                    {'hidden' : !props.collapsed}
                )}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className='flex justify-center items-center gap-2 p-2 px-3 rounded-md cursor-pointer hover:bg-secondary/60'>
                        <Button variant="secondary" size="icon" className="rounded-full "
                            style={{ width: "30px", height: "30px" }}
                        >
                            <Icons.user className="h-4 w-4" />
                        </Button>
                        <span className='text-sm font-bold'>
                            {pharmacy_data.first_name+" "+pharmacy_data.last_name}
                        </span>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {
                        theme == 'light'
                        ?
                            <DropdownMenuItem className='gap-2' onClick={() => setTheme('dark')}>
                                <Icons.moon 
                                className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                                onClick={() => setTheme('dark')}
                                />
                                    Dark Mode
                            </DropdownMenuItem>
                        :
                            <DropdownMenuItem className='gap-2' onClick={() => setTheme('light')}>
                                <Icons.sun
                                className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all light:-rotate-90 light:scale-0 "
                                onClick={() => setTheme('light')}
                                />
                                    Light Mode 
                            </DropdownMenuItem>
                    }
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='gap-2' onClick={() => {logout()}}>
                        <Icons.logout
                            className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all light:-rotate-90 light:scale-0 "
                            onClick={() => {logout()}}
                        />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default HeaderBar
