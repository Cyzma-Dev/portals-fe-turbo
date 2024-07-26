import AccountCreation from '../presentation/accountCreation'
import { IPatientSignUpRequest } from '@repo/common/common-library';

interface IAccountCreationContainerProps {
	handleNext: () => void;
	setIsSignUpDetails: any;
	patientId: number;
}

const AccountCreationContainer = (props: IAccountCreationContainerProps) => {

	const patientSignUpHandler = async (requestData: IPatientSignUpRequest) => {
		// update the code to delete the confirm password from he requestData
		props?.setIsSignUpDetails({
			username: requestData?.username,
			password: requestData?.password,
			roles: requestData?.roles,
			patient_id: props?.patientId,
		});
		props.handleNext();
	};

    return (
        <AccountCreation
            patientSignUpHandler={patientSignUpHandler}
        />
    )
}

export default AccountCreationContainer