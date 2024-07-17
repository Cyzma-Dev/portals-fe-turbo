import { BrowserUtility } from "../browser"
import { APIConstant } from "../constants"
import { BaseService } from "./base"
import { UserService } from "./userService"

export class logoutService {
    static logout = async () => {
        const data = {
            refresh_token: UserService.getRefreshToken(),
        }
        await BaseService.post(APIConstant.logoutUrl, data, true)
        BrowserUtility.clear()
    }
}
