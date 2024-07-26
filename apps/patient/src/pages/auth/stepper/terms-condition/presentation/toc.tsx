import { Button, Checkbox, Icons, Form, FormControl, FormField, FormItem, FormLabel } from '@repo/ui/shadcn';
import { useState } from 'react'
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
;
import { useForm } from 'react-hook-form';
import { IActivationSubmitTypes, ITosTemplate } from './types';
import { accountActivationSchema } from './schema';
interface ITosProps {
	isBtnDisable?: boolean
	setIsBtnDisable: (value: boolean) => void;
	patientSignUpHandler: (formData: IActivationSubmitTypes) => any
	isLoading: boolean
	data: ITosTemplate | undefined
}

const Toc = (props: ITosProps) => {
    const form = useForm<z.infer<typeof accountActivationSchema>>({
		resolver: zodResolver(accountActivationSchema),
        defaultValues:{
            is_toc: false,
        }
	})
	const [isTermsChecked, setTermsChecked] = useState<boolean | string>(false);

	const tocCheckHandler = (checked: boolean | string) => {
		setTermsChecked(checked)
		props.setIsBtnDisable(false)
	}

	const onActivationSubmit = (data: IActivationSubmitTypes) => {
		props.patientSignUpHandler(data)
	}

	return (
		<div className='flex flex-col justify-center gap-4 items-center w-full'>
			<div className='flex flex-col items-center bg-background w-full rounded-md space-y-4 p-4'>
				<div className='text-md'>
					Agree to the Terms and Conditions to Activate your account.
				</div>
				{
					props.data?.toc ? (
					<div
						dangerouslySetInnerHTML={{ __html: props.data.toc }}
						className='rounded-md bg-secondary p-4 h-[20rem] overflow-y-auto'
					/>
				) : (
					<span>No content available</span>
				)}
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onActivationSubmit)} className="grid w-full gap-4">
							<FormField
								control={form.control}
								name="is_toc"
								render={({ field }) => (
									<FormItem className="w-full flex items-start space-x-3 space-y-0 rounded-md">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={(e) => {
													tocCheckHandler(e)
													field.onChange(e)
												}}
											/>
										</FormControl>
											<FormLabel className='flex items-center justify-center'>
												I accept all the agreements mentioned in the Terms and Conditions.
											</FormLabel>
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								color="primary"
								disabled={props.isBtnDisable || !isTermsChecked}
							>
								{props.isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin'/> }
								Activate your account
							</Button>
						</form>
					</Form>
					{/* <Checkbox
						id='terms'
						checked={isTermsChecked}
						onCheckedChange={tosCheckHandler}
					/>
					<label
						htmlFor="terms"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						I accept all the agreements mentioned in the Term of Service.
					</label> */}
			</div>

		</div>
	)
}

export default Toc