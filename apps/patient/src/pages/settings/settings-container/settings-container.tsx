import React, { useState } from 'react'
import { Icons, Separator } from '@repo/ui/shadcn';
import UserProfileContainer from '../user-profile/container/user-profile-container';
import clsx from 'clsx';
import { ChangePasswordContainer } from '../change-password/container/change-passsword-container';

const SettingsContainer = () => {
    const [activeComponent, setActiveComponent] = useState('user-profile');

    const SIDENAV_ITEMS: any[] = [
        {
            title: 'Profile',
            path: 'user-profile',
            icon: <Icons.home width="16" height="16" />,
        },
        {
            title: 'Change Password',
            path: 'change-password',
            icon: <Icons.userRound width="16" height="16" />,
        }
    ];
 
    const SettingNavComponent = () => {
        return (
            <nav className="flex sm:flex-col gap-2 text-sm font-medium text-foreground sm:w-40">
                {SIDENAV_ITEMS.map((item) => (
                    <div
                        key={item.title}
                        onClick={() => setActiveComponent(item.path)}
                        className={clsx('cursor-pointer p-2 pl-3',{
                            'bg-secondary rounded-sm': item.path == activeComponent,
                            'hover:underline': item.path != activeComponent
                        })}
                    >
                        {item.title}
                    </div>
                ))}
            </nav>
        )
    }

    const renderComponent = () => {
      switch (activeComponent) {
        case 'user-profile':
            return <UserProfileContainer />;
        case 'change-password':
          return <ChangePasswordContainer />;
      }
    };

    return (
        <div className='flex flex-col gap-4 w-full h-full'>
            <div className='flex flex-col justify-content items-start text-xl font-bold'>
				Settings
                <div className='text-sm font-normal'>Manage your account settings and set preferences.</div>
			</div>
            <Separator/>
            <div className='grid sm:flex gap-4 mx-2'>
                <SettingNavComponent/>
                {renderComponent()}
            </div>
        </div>
    )
}

export default SettingsContainer