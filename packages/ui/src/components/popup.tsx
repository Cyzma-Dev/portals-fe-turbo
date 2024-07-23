import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { DialogHeader, } from '../shadcn/ui';

interface IPopupProps {
    fullScreenDialog: boolean;
    setFullScreenDialog: (data: boolean) => void;
    title: string;
    children: React.ReactNode
}

export function Popup(props: IPopupProps) {


    return (
        <Dialog
            open={props.fullScreenDialog}
            onOpenChange={props.setFullScreenDialog}
        >
            {/* <DialogTrigger asChild={false}>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger> */}
            <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 p-6 m-6 rounded-lg shadow-lg z-20 overflow-auto h-auto w-auto">


                <DialogHeader>
                    <DialogTitle className='font-bold '>
                        {props.title}
                    </DialogTitle>
                    {/* <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription> */}
                </DialogHeader>
                <div>
                    {props.children}
                </div>
                {/* <DialogFooter>
                    <Button type="button" onClick={() => props.setFullScreenDialog(false)}>Close</Button>
                </DialogFooter> */}
            </DialogContent>
        </Dialog>
    );
}
