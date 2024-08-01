import { useState } from 'react'
import { ChangePasswordService, IChangePasswordRequest } from '../utility'

export const ChangePasswordHook = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const changePassword = async (requestParams: IChangePasswordRequest) => {
		try {
			const result = await ChangePasswordService.changePassword(requestParams)
			return result
		} catch (error: any) {
			setErrorMessage(error)
			setIsLoading(false)
			return error?.data.message || error?.data.error
		} finally {
			setIsLoading(false)
		}
	}
	return { changePassword, errorMessage, isLoading, setIsLoading }
}
