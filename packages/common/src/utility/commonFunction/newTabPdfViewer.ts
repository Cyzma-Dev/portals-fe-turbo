import { pdfViewerInAndOutBoundService } from "../service";

export const NewTabPdfViewer = async (rec_id: string) => {

    const base64toBlob = (base64Data: string, contentType: string) => {
        const sliceSize = 512;
        const byteCharacters = atob(base64Data);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    };

    try {
        const result: any = await pdfViewerInAndOutBoundService.getTemplateData(rec_id);
        const pdfData = result.results.document.substring(
            result.results.document.indexOf("'") + 1,
            result.results.document.lastIndexOf("'")
        );
        const pdfBlob = base64toBlob(pdfData, 'application/pdf');
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Try opening in new tab
        window.open(pdfUrl, '_blank');
        return false

    } catch (error: any) {
        if (error?.status) {
            return error.data.message
        }
    }
};
