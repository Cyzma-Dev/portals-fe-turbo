import { Button, Popup, Icons } from '@repo/ui/shadcn'
import React, { useState } from 'react'
import { toast } from 'sonner'
import IconWrapper from './Icon-wrapper'
interface IDownloadPdfProps {
    fullScreenDialog: boolean
    setFullScreenDialog: (data: boolean) => void
    rec_id: string
    fileName: string
    downloadPdfDocument: (rec_id: string, fileName: string) => Promise<string | boolean>

}

export function CommonDownloadPdf(props: IDownloadPdfProps) {
    const [pdfDownloadLoading, setPdfDownloadLoading] = useState<boolean>(false);

    return (
        <Popup
            fullScreenDialog={props.fullScreenDialog}
            setFullScreenDialog={props.setFullScreenDialog}
            title="Download Warning"
        >
            Are you sure you want to download the file ?
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>

                <Button onClick={() => { props.setFullScreenDialog(false) }} disabled={pdfDownloadLoading}>
                    Cancel
                </Button>

                <Button disabled={pdfDownloadLoading}
                    onClick={async () => {
                        setPdfDownloadLoading(true)
                        const response = await props.downloadPdfDocument(props.rec_id, props.fileName)
                        if (response) {
                            toast.error(response)
                        }
                        setPdfDownloadLoading(false)
                        props.setFullScreenDialog(false)
                    }}>
                    {
                        pdfDownloadLoading
                        &&
                        <IconWrapper>
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        </IconWrapper>
                    }
                    yes
                </Button>
            </div>
        </Popup>
    )
}

