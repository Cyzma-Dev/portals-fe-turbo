import clsx from "clsx";
import { Separator } from "../shadcn/ui";

interface IStepperProps {
    steps : string[]
    activeStep: number 
}

export const Stepper = (props: IStepperProps) => {

    return (
        <div className="flex items-center justify-center text-xs font-medium text-gray-500 sm:gap-2">
            {props.steps?.map((item:string, index:number)=>{
                return(
                    <div className="flex items-center justify-center" key={index}>
                        <div className={clsx("flex items-center justify-center gap-1 p-1.5 rounded-md",{
                            "bg-green-50": index < props.activeStep,
                            "bg-blue-50": index == props.activeStep,
                            "bg-background/20": index > props.activeStep
                        })}>
                            <div 
                                className={clsx("rounded-full flex items-center justify-center w-5 h-5",{
                                    "text-green": index < props.activeStep,
                                    "text-blue": index == props.activeStep,
                                    "text-muted-foreground": index > props.activeStep
                                })}
                            >
                                {
                                    index == props.activeStep || index > props.activeStep
                                ?
                                    <span>{index + 1}</span>
                                :
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
                                }
                            </div>
                            <div
                                className={clsx({
                                    'text-green': index < props.activeStep,
                                    'text-blue': index == props.activeStep,
                                    "text-muted-foreground": index > props.activeStep
                                })}
                            >
                                {item}
                            </div>
                        </div>

                        {(index+1 !== props.steps.length) &&
                            <Separator className="bg-foreground w-8 ml-2" />
                        }
                    </div>
                )
            })}
        </div>
    )
}