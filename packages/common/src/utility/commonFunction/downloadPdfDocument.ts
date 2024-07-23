import { pdfViewerInAndOutBoundService } from "../service";


export const DownloadPdfDocument = async (rec_id: string, file_name: string) => {
    try {
        const result = await pdfViewerInAndOutBoundService.getTemplateData(rec_id);
        const link = document.createElement('a');
        link.href = `data:application/${result.results.document_type.toLowerCase()};base64,${result.results.document.substring(
            result.results.document.indexOf("'") + 1,
            result.results.document.lastIndexOf("'")
        )}`
        link.setAttribute('download', `${file_name}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
        return false

    } catch (error: any) {
        if (error?.status) {
            return error.data.message
        }
    } finally {
        // ""
    }
};