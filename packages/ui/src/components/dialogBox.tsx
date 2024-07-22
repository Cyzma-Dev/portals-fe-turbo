import React, { Children } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { Button, DialogFooter, DialogHeader, } from '../shadcn/ui';

interface DialogProps {
    FullScreenPreview: boolean;
    setFullScreenPreview: (data: boolean) => void;
    title: string;
    children: React.ReactNode
}

export function DialogBox(props: DialogProps) {


    return (
        <Dialog
            open={props.FullScreenPreview}
            onOpenChange={props.setFullScreenPreview}
        >
            {/* <DialogTrigger asChild={false}>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger> */}
            <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 p-6 m-6 rounded-lg shadow-lg z-20 overflow-auto h-full w-full">


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
                <DialogFooter>
                    <Button type="button" onClick={() => props.setFullScreenPreview(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
