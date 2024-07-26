import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Icons, Input } from "@repo/ui/shadcn";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { userLoginSchema } from './schema';
import { InputTypeLoginUser } from './types';
import { useNavigate } from 'react-router-dom';
interface ILoginProps {
	loginHandler: (data: InputTypeLoginUser) => void;
	isBtnDisable: boolean
	isLoading: boolean
}

const LoginScreen = (props: ILoginProps) => {
	const navigate = useNavigate();

	const onLoginSubmit = (formData: InputTypeLoginUser) => {
		props.loginHandler(formData);
	};

	const form = useForm<z.infer<typeof userLoginSchema>>({
		resolver: zodResolver(userLoginSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	})
	
	return (
		<div className="">
			<div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
				<div className="flex flex-col text-center">
					<p className="text-md font-bold text-foreground">
						Sign in to Patient Portal
					</p>
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onLoginSubmit)}>
						<div className="flex flex-col gap-4 py-2 pb-6">
							<FormField
								control={form.control}
								name="username"
								disabled={props.isLoading}
								render={({ field }) => (
									<FormItem>
									<FormControl>
										<Input placeholder="Username" {...field} />
									</FormControl>
									<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								disabled={props.isLoading}
								render={({ field }) => (
									<FormItem>
									<FormControl>
										<Input type="password" placeholder="Password" {...field} />
									</FormControl>
									<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button className="md:right-8 md:top-8 w-full" type="submit" disabled={props.isLoading}>
						{props.isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> }
						Sign In
						</Button>
					</form>
				</Form>
				<p className="flex flex-col px-8 text-center text-sm text-muted-foreground">
					<span className="cursor-pointer hover:text-brand" >
						New here? &nbsp;<span className='text-primary hover:underline' onClick={() => navigate('/patient-signup')}>Click here to Sign Up</span>
					</span>
					<span className="cursor-pointer hover:text-brand text-primary hover:underline" onClick={() => navigate('/forgot-password')}>
						Forgot Password ?
					</span>
				</p>
			</div>
		</div>
	);
};

export default LoginScreen;
