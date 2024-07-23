import { APIConstant, IPdfViewerInAndoutboundtypes, IResponse } from "../..";
import { BaseService } from "."

export class pdfViewerInAndOutBoundService {
    static getTemplateData = async (
        templateRecordId: string
    ): Promise<IResponse<IPdfViewerInAndoutboundtypes>> => {
        console.log(templateRecordId, "templateRecordId")
        const response = await BaseService.get<IResponse<IPdfViewerInAndoutboundtypes>>(
            `${APIConstant.fax_Common_template_data.replace(
                '<str:rec_id>',
                templateRecordId + ''
            )}`,
            true
        );
        return response;
    };

}
