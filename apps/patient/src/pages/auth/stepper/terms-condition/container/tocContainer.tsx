import { IPatientSignUpRequest } from '@repo/common/common-library';
import { useState } from 'react';
import { toast } from 'sonner';
import { TocTemplateHook } from '../../../../../hooks';
import { PatientSignUpService } from '../../../../../utility';
import Toc from '../presentation/toc';
import { IActivationSubmitTypes } from '../presentation/types';

interface ITosContainer {
	isSignUpDetails: IPatientSignUpRequest;
	handleNext: () => void;
}

export const TocContainer = (props: ITosContainer) => {
	const {
		isLoading,
		setIsLoading,
		tosTemplateData,
	} = TocTemplateHook();

	const [isBtnDisable, setIsBtnDisable] = useState<boolean>(false);

	const patientSignUpHandler = async (formData: IActivationSubmitTypes) => {
		try {
			setIsBtnDisable(true);
			setIsLoading(true);
			const requestData = {
				...props?.isSignUpDetails,
				is_toc: formData.is_toc
			};
			const response = await PatientSignUpService?.signUp(
				requestData
			);
			if (response?.state === 'success') {
				toast.success('Your account has been created successfully.');
				props.handleNext();
			}
		} catch (err: any) {
			console.log(err, 'errore');
			for (const key in err?.data?.error) {
				if (key) {
					toast.error(err?.data?.error[key]);
				} else {
					err?.data?.error && toast.error(err?.data?.error);
					err?.data?.message && toast.error(err?.data?.message);
				}
			}
			setIsBtnDisable(false);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Toc
			setIsBtnDisable={setIsBtnDisable}
			isBtnDisable={isBtnDisable}
			patientSignUpHandler={patientSignUpHandler}
			data={tosTemplateData}
			isLoading={isLoading}
		/>
	);
};
