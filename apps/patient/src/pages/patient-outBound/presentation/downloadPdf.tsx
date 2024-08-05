import { Button, Popup, Icons } from '@repo/ui/shadcn'
import React, { useState } from 'react'
import IconWrapper from '../../../../../../packages/ui/src/components/Icon-wrapper'
import { DownloadPdfDocument } from '@repo/common/common-library'
import { IOutBoundList } from './types'
interface IDownloadPdfProps {
    fullScreenDialog: boolean
    setFullScreenDialog: (data: boolean) => void
    clickedActionRowData: IOutBoundList
}

function DownloadPdf(props: IDownloadPdfProps) {
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
                        await DownloadPdfDocument(props.clickedActionRowData.rec_id, `${props.clickedActionRowData.patient_name}_${props.clickedActionRowData.rx_number}`)
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

export default DownloadPdf
