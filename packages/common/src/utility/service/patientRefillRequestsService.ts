import { IResponse } from '../../common-props'
import { APIConstant } from '../constants'
import { BaseService } from './'

export class PatientRefillRequestService {
    static createRefiilRequest = async (data: ICreateRefillRequest, id: number) => {
        const response = await BaseService.post<IResponse>(
            APIConstant.create_refill_request.replace("<int:patient_id>", id + ""),
            data,
            true
        )
        return response
    }
}
