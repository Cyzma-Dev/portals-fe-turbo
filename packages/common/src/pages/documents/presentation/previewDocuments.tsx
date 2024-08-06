import React, { useState } from "react"
import { IPreviewDocumentsProps } from "./type";
import { Button, Popup, Icons, Input, Sheet, SheetContent, SheetTitle, SheetHeader, SheetDescription, ScrollArea } from "@repo/ui/shadcn";

interface IDocumentsNotesProps extends IPreviewDocumentsProps {

}
export const PreviewDocuments = (props: IDocumentsNotesProps) => {
    const [fullScreenDialog, setFullScreenDialog] = useState(false);
    return (
        <>
            <Sheet open={props.previewSheetOpen} onOpenChange={props.setPreviewSheetOpen}>
                <SheetContent
                    className="p-0 "
                    onOpenAutoFocus={(e: any) => e.preventDefault()}
                >
                    <ScrollArea className='h-screen'>
                        <SheetHeader>
                            <SheetTitle>{'Preview Document'}</SheetTitle>
                            <SheetDescription>
                                Get a detailed look at the document
                            </SheetDescription>
                        </SheetHeader>
                        {props.viewerFile?.document_type === 'PDF'
                            ?
                            <>
                                <div className="m-4 flex flex-col gap-4">
                                    <embed
                                        src={`data:application/pdf;base64,${props.viewerFile?.document.substring(
                                            props.viewerFile?.document.indexOf("'") + 1,
                                            props.viewerFile?.document.lastIndexOf("'")
                                        )}`}
                                        type='application/pdf'
                                        width='100%'
                                        height='500'
                                    >
                                    </embed>
                                    <div className="flex justify-between">
                                        <div>
                                            <a
                                                download={
                                                    props.viewerFile?.document_name ??
                                                    'document' +
                                                    '.' +
                                                    props.viewerFile?.document_type.toLowerCase() ??
                                                    true
                                                }
                                                href={`data:application/${props.viewerFile?.document_type.toLowerCase()};base64,${props.viewerFile?.document.substring(
                                                    props.viewerFile?.document.indexOf("'") + 1,
                                                    props.viewerFile?.document.lastIndexOf("'")
                                                )}`}
                                            >
                                                <Button size={'sm'}>
                                                    <Icons.downloadArrow className="h-4 w-4 mr-2"/>
                                                    Download
                                                </Button>
                                            </a>
                                        </div>
                                        <div>
                                            <Button size={'sm'}onClick={() => setFullScreenDialog(true)}>
                                                <Icons.fullScreen className="h-4 w-4 mr-2"/>
                                                Preview
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className="flex flex-col gap-4 m-4">
                                    <img
                                        style={{
                                            width: '100',
                                            height: 'auto',
                                            maxWidth: '100%',
                                        }}
                                        alt=''
                                        src={`data:image/${props.viewerFile?.document_type.toLowerCase()};base64,${props.viewerFile?.document.substring(
                                            props.viewerFile?.document.indexOf("'") + 1,
                                            props.viewerFile?.document.lastIndexOf("'")
                                        )}`}
                                    />
                                    <div className="flex justify-between">
                                    <div>
                                        <a
                                            download={
                                                props.viewerFile?.document_name ??
                                                'document' + '.' +
                                                props.viewerFile?.document_type.toLowerCase() ??
                                                true
                                            }
                                            href={`data:image/${props.viewerFile?.document_type.toLowerCase()};base64,${props.viewerFile?.document.substring(
                                                props.viewerFile?.document.indexOf("'") + 1,
                                                props.viewerFile?.document.lastIndexOf("'")
                                            )}`}
                                        >
                                            <Button size={'sm'}>
                                                <Icons.downloadArrow className="h-4 w-4 mr-2"/>
                                                Download
                                            </Button>
                                        </a>
                                    </div>
                                    <div>
                                        <Button size={'sm'} onClick={() => setFullScreenDialog(true)}>
                                            <Icons.fullScreen className="h-4 w-4 mr-2"/>
                                            Preview
                                        </Button>
                                    </div>
                                </div>
                                </div>
                                
                            </>
                        }
                        <div className="flex flex-col gap-4 m-4">
                            <div>
                                <span>Document Name</span>
                                <Input type="text" disabled={true} placeholder="Document Name" defaultValue={props.viewerFile?.document_name} />
                            </div>
                            <div>
                                <span>Subject Name</span>
                                <Input type="text" disabled={true} placeholder="Subject Name" defaultValue={props.viewerFile?.subject_name} />
                            </div>
                            <div>
                                <span>Note</span>
                                <Input type="text" disabled={true} placeholder="Note" defaultValue={props.viewerFile?.note} />
                            </div>
                        </div>
                    </ScrollArea>
                </SheetContent >
            </Sheet>


            <Popup
                fullScreenDialog={fullScreenDialog}
                setFullScreenDialog={setFullScreenDialog}
                title="Preview"
            >
                {props.viewerFile?.document_type === 'PDF'
                    ?
                        <embed
                            src={`data:application/pdf;base64,${props.viewerFile?.document.substring(
                                props.viewerFile?.document.indexOf("'") + 1,
                                props.viewerFile?.document.lastIndexOf("'")
                            )}`}
                            className="w-[60rem] h-full sm:h-[40rem]"
                            type='application/pdf'
                        ></embed>
                    :
                    <img
                        className='object-cover w-[40rem] h-[30rem]'
                        alt=''
                        src={`data:image/${props.viewerFile?.document_type.toLowerCase()};base64,${props.viewerFile?.document.substring(
                            props.viewerFile?.document.indexOf("'") + 1,
                            props.viewerFile?.document.lastIndexOf("'")
                        )}`}
                    />
                }
            </Popup>
        </>
    )
}