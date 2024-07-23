import React, { useState } from "react"

import { IPreviewDocumentsProps } from "./type";
import { Button, Popup, Icons, Input, Sheet, SheetContent } from "@repo/ui/shadcn";



interface IDocumentsNotesProps extends IPreviewDocumentsProps {

}
export const PreviewDocuments = (props: IDocumentsNotesProps) => {

    const [fullScreenDialog, setFullScreenDialog] = useState(false);

    return (
        <>

            <Sheet open={props.previewSheetOpen} onOpenChange={props.setPreviewSheetOpen} >
                <SheetContent
                    className="p-0 "
                    onOpenAutoFocus={(e: any) => e.preventDefault()}
                >
                    <div className="h-full">
                        {props.viewerFile?.document_type === 'PDF'
                            ?
                            <>
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
                                <div className="flex justify-between p-3">
                                    <div >
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
                                            <Button >
                                                <Icons.downloadArrow />
                                                Download
                                            </Button>
                                        </a>
                                    </div>
                                    <div style={{ cursor: 'zoom-in' }}>
                                        <Button onClick={() => setFullScreenDialog(true)}>
                                            <Icons.scanEye />
                                            Preview
                                        </Button>

                                    </div>
                                </div>
                            </>
                            :
                            <>
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
                                <div className="flex justify-between p-3">
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
                                            <Button >
                                                <Icons.downloadArrow />
                                                Download
                                            </Button>
                                        </a>
                                    </div>
                                    <div style={{ cursor: 'zoom-in' }}>
                                        <Button onClick={() => setFullScreenDialog(true)}>
                                            <Icons.scanEye />
                                            Preview
                                        </Button>
                                    </div>
                                </div>
                            </>
                        }
                        <div>
                            <span>Document Name</span>
                            <Input type="text" disabled={true} placeholder="Document Name" defaultValue={props.viewerFile?.document_name} />
                            <span>Subject Name</span>
                            <Input type="text" disabled={true} placeholder="Subject Name" defaultValue={props.viewerFile?.subject_name} />
                            <span>Note</span>
                            <Input type="text" disabled={true} placeholder="Note" defaultValue={props.viewerFile?.note} />
                        </div>
                    </div>
                </SheetContent >
            </Sheet>


            <Popup
                fullScreenDialog={fullScreenDialog}
                setFullScreenDialog={setFullScreenDialog}
                title="Preview"
            >
                {props.viewerFile?.document_type === 'PDF'
                    ?
                    <span>
                        <embed
                            src={`data:application/pdf;base64,${props.viewerFile?.document.substring(
                                props.viewerFile?.document.indexOf("'") + 1,
                                props.viewerFile?.document.lastIndexOf("'")
                            )}`}
                            type='application/pdf'
                        ></embed>
                    </span>
                    :
                    <img
                        className='object-cover '
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