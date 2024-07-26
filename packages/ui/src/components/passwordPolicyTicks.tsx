import clsx from "clsx";

interface IPasswordValidationProps {
  isNumbers: boolean;
  isUppers: boolean;
  isLowers: boolean;
  isSpecials: boolean;
  isPasswordMatch: boolean;
  isPasswordValue: string;
  isNotConfirmPassword?: boolean;
}

const PasswordPolicyTicks = (props: IPasswordValidationProps) => {
  const policySatisfied = props.isNumbers && props.isUppers && props.isLowers && props.isSpecials && props.isPasswordMatch;
  const CheckIcon = () => {
    return(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="#022100"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-circle-check-big"
    >
      <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
    </svg>
    )
  }

  const CircleDotIcon = () => {
    return(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-circle-dot"
      >
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="1"/>
      </svg>
    )
  }
  return (
    <div className="pb-4">
      {
        policySatisfied
        ?
          <div className="flex flex-col gap-2 rounded-md justify-start bg-background p-4 text-xs font-bold">
            <p>Password Requirements</p>
            <div className="flex bg-greenBackground w-fit p-2 rounded-md items-center gap-2 text-green">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-check-big"
              >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <path d="m9 11 3 3L22 4"/>
              </svg>
              <span className="">
                Password Policy is Satisfied
              </span>
            </div>
          </div>
        :
          <div className="flex flex-col gap-2 bg-background p-4 rounded-md text-sm">
            <p>Password Requirements</p>
            <div className='passwordRequirements'>
              <div
                className={clsx('flex gap-2 items-center',
                  {
                    'text-green' : props.isNumbers,
                    'text-slate-500': !props.isNumbers,
                  }
                )}
              >
                {
                  props.isNumbers
                  ?
                  <CheckIcon/>
                  :
                  <CircleDotIcon/>
                }
                A number (0..9)
              </div>

              <div
                className={clsx('flex gap-2 items-center',
                  {
                    'text-green' : props.isUppers,
                    'text-slate-500': !props.isUppers,
                  }
                )}
              >
                {
                  props.isUppers
                  ?
                  <CheckIcon/>
                  :
                  <CircleDotIcon/>
                }
                1 uppercase letter
              </div>

              <div
                className={clsx('flex gap-2 items-center',
                  {
                    'text-green' : props.isLowers,
                    'text-slate-500': !props.isLowers,
                  }
                )}
              >
                {
                  props.isLowers
                  ?
                  <CheckIcon/>
                  :
                  <CircleDotIcon/>
                }
                1 lowercase letter
              </div>

              <div
                className={clsx('flex gap-2 items-center',
                  {
                    'text-green' : props.isSpecials,
                    'text-slate-500': !props.isSpecials,
                  }
                )}
              >
                {
                  props.isSpecials
                  ?
                  <CheckIcon/>
                  :
                  <CircleDotIcon/>
                }
                1 special character
              </div>
              
              <div
                className={clsx('flex gap-2 items-center',
                  {
                    'text-green' : props.isPasswordMatch,
                    'text-slate-500': !props.isPasswordMatch,
                  }
                )}
              >
                {
                  props.isPasswordMatch
                  ?
                  <CheckIcon/>
                  :
                  <CircleDotIcon/>
                }
                both passwords should match
              </div>
            </div>
          </div>
      }
    </div>
  );
};
export default PasswordPolicyTicks;
