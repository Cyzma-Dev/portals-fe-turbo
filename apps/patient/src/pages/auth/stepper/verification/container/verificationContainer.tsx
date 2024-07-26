import React, { useState } from 'react'
import Verification from '../presentation/verification'
import { toast } from 'sonner';
import { IVerificationTypes } from '../presentation/type';
import { PatientVerifyService } from '../../../../../utility';

interface IVerification {
  handleNext: () => void;
  setPatientId: any;
}

const VerificationContainer = (props: IVerification) => {

	const [isBtnDisable, setIsBtnDisable] = useState(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

  const patientVerificationHandler = async (requestData: IVerificationTypes) => {
    setIsBtnDisable(true)
    setIsLoading(true)
    try {
      const response = await PatientVerifyService.patientVerify(requestData);
      props.setPatientId(response?.results?.patient_id);
      props.handleNext()
    } catch (error: any) {
      error?.data?.error && toast.error(error?.data?.error);
      error?.data?.message && toast.error(error?.data?.message);
    } finally {
      setIsLoading(false)
      setIsBtnDisable(false)
    }
  };

  return (
    <Verification
      isBtnDisable={isBtnDisable}
      isLoading={isLoading}
      patientVerificationHandler={patientVerificationHandler}
    />
  )
}

export default VerificationContainer