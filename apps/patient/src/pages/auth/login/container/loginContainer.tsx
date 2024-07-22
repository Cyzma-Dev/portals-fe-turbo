import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginHook } from '../../../../hooks/loginHook';
import { AuthHook, ILocalUser,PatientContext, UserService } from '@repo/common/common-library';
import { useQuery } from '../../../../hooks';
import LoginScreen from '../presentation/login';
import { InputTypeLoginUser } from '../presentation/types';
export const LoginContainer = () => {

	const { setPatient } = useContext(PatientContext);

	const navigate = useNavigate();
	const query = useQuery();
	const auth = AuthHook();
	const [isBtnDisable, setIsBtnDisable] = useState(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { login } = LoginHook();

	const loginHandler = async (formData: InputTypeLoginUser) => {
		setIsLoading(true)
		setIsBtnDisable(true)
		try {
			const result = await login(formData);
			const patient_data = {
				user_id: result?.results?.patient_info?.user_id,
				chat_profile_id: result?.results?.patient_info?.chat_profile_id,
				patient_id: result?.results?.patient_info?.patient_id,
				first_name: result?.results?.patient_info?.first_name,
				last_name: result?.results?.patient_info?.last_name,
				roles: result?.results?.roles[0],
				notification_indicator: result?.results?.patient_info?.notification_indicator,
			};
			localStorage.setItem(
				'patient_info',
				JSON.stringify(patient_data)
			);



			setPatient?.(patient_data);
			if (result?.state && result?.state === 'success') {
				const user: ILocalUser = {
					first_name: result?.results?.first_name,
					last_name: result?.results?.last_name,
					permission_list: result?.results?.permission_list,
					roles: result?.results?.roles,
				};
				UserService.saveToken(result?.results?.access);
				UserService.saveRefreshToken(result?.results?.refresh);
				UserService.saveUser(user);
				auth.login && auth.login(user);
				// customToaster.success(result?.message);
				const fromUrl = query.get('return');
				if (fromUrl) {
					navigate(fromUrl);
				} else {
					navigate('/patient-notes', { replace: true });
				}
				setIsBtnDisable(false)
			}
		} catch (error: any) {
			if (error?.data?.state && error?.data?.state === 'error') {
				// error?.data?.error && customToaster.error(error?.data?.error);
				// error?.data?.message && customToaster.error(error?.data?.message);
			}
		} finally {
			setIsBtnDisable(false);
			setIsBtnDisable(false);
		}
	};

	return (
		<LoginScreen
			loginHandler={loginHandler}
			isBtnDisable={isBtnDisable}
			isLoading={isLoading}
		/>
	);
};
