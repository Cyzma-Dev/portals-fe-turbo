import { Outlet } from 'react-router-dom';

function AuthLayout() {

    return (
        <div className="block h-screen w-screen flex-col items-center justify-center text-accent-foreground lg:max-w-none lg:grid lg:grid-cols-2 lg:px-0">
            <div className="hidden relative lg:flex flex-col items-center justify-center bg-blue-200 dark:bg-background h-full w-full">
                <div>
                    <img 
                        className='object-scale-down h-48'
                        src="svg/statistics.svg"
                        alt='logo'
                    />
                </div>
                <div className='flex flex-col items-center justify-center mt-10 gap-1'>
                    <span className='font-extrabold'>Drive Patient Prescriptions with ease</span>
                    <span className='text-sm'>Your health is our priority</span>
                </div>
            </div>
            <div className='flex flex-col items-center bg-muted h-full justify-center'>
                <img
                    className='w-48'
                    src="png/alera.png"
                    alt='logo'
                />
                <Outlet />
            </div>
        </div>
    );
}

export default AuthLayout;
