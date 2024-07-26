import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IPatientSignUpRequest } from "../../login/presentation/types";
import { Stepper } from "@repo/ui/shadcn";
import VerificationContainer from "../verification/container/verificationContainer";
import AccountCreationContainer from "../account-creation/container/accountCreationContainer";
import { TocContainer } from "../terms-condition/container/tocContainer";

function getSteps() {
  return ["Verification", "Create Account", "Terms and Conditions"];
}

function getStepContent(
  activeStep: number,
  handleNext: any,
  setIsSignUpDetails: any,
  isSignUpDetails: IPatientSignUpRequest,
  setPatientId: any,
  patientId: number
) {
  switch (activeStep) {
    case 0:
      return (
        <VerificationContainer
          handleNext={handleNext}
          setPatientId={setPatientId}
        />
      );
    case 1:
      return (
        <AccountCreationContainer
          handleNext={handleNext}
          setIsSignUpDetails={setIsSignUpDetails}
          patientId={patientId}
        />
      );
    case 2:
      return (
        <TocContainer
          isSignUpDetails={isSignUpDetails}
          handleNext={handleNext}
        />
      );
  }
}

export const AuthSteps = () => {

  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const steps = getSteps();
  const [patientId, setPatientId] = useState(0);
  const [isSignUpDetails, setIsSignUpDetails] = useState<IPatientSignUpRequest>(
    {
      username: "",
      password: "",
      roles: [],
    }
  );

  if (activeStep >= steps?.length) {
    navigate('/account-created', { replace: true });
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-9/12">
      {/* <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100"> */}
      <Stepper
        steps={steps}
        activeStep={activeStep}
      />
        {
          getStepContent(
            activeStep,
            handleNext,
            setIsSignUpDetails,
            isSignUpDetails,
            setPatientId,
            patientId
          )
        }

      {/* <Button onClick={()=>setActiveStep((prev) => prev+1)}>Step</Button> */}
    </div>
  );
};
