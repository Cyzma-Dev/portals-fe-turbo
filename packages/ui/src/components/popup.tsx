import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogOverlay } from '@radix-ui/react-dialog';
import { DialogHeader, } from '../shadcn/ui';
import IconWrapper from './Icon-wrapper';
import { Icons } from './icons';

interface IPopupProps {
    fullScreenDialog: boolean;
    setFullScreenDialog: (data: boolean) => void;
    title?: string;
    children: React.ReactNode
    header?: React.ReactNode
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
            <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />
            <DialogContent className="w-full lg:w-fit z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary p-6 pb-2 rounded-md">
                <DialogHeader>
                    <DialogTitle className='font-bold flex justify-between'>
                        {props.title
                            ?
                            props.title
                            :
                            props.header
                        }
                        <IconWrapper
                            className="cursor-pointer hover:text-red hover:fill-redBackground hover:bg-redBackground"
                            onClick={() => {
                                props.setFullScreenDialog(false)
                            }}
                        >
                            <Icons.x className="h-4 w-4" />
                        </IconWrapper>
                    </DialogTitle>
                    {/* <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription> */}
                </DialogHeader>
                <div className='my-4'>
                    {props.children}
                </div>
                {/* <DialogFooter>
                    <Button type="button" onClick={() => props.setFullScreenDialog(false)}>Close</Button>
                </DialogFooter> */}
            </DialogContent>
        </Dialog>
    );
}
