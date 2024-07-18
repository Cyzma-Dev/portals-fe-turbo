import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Icons, Input } from "@repo/ui/shadcn";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { userLoginSchema } from './schema';
import { InputTypeLoginUser } from './types';
interface ILoginProps {
	loginHandler: (data: InputTypeLoginUser) => void;
	isBtnDisable: boolean
}

const LoginScreen = (props: ILoginProps) => {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const onLoginSubmit = (formData: InputTypeLoginUser) => {
		setIsLoading(true)
		props.loginHandler(formData);
		setIsLoading(false)
	};

	const form = useForm<z.infer<typeof userLoginSchema>>({
		resolver: zodResolver(userLoginSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	})

	return (
		<div className="p-8">
			<div className="mx-auto flex w-full flex-col justify-center space-y-3 sm:w-[350px]">
				<div className="flex flex-col text-center">
					<p className="text-md font-bold text-foreground">
						Sign in to Pharmacy Portal
					</p>
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onLoginSubmit)}>
						<div className="flex flex-col gap-4 py-2 pb-6">
							<FormField
								control={form.control}
								name="username"
								disabled={isLoading}
								render={({ field }) => (
									<FormItem>
									<FormControl>
										<Input placeholder="username" {...field} />
									</FormControl>
									<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								disabled={isLoading}
								render={({ field }) => (
									<FormItem>
									<FormControl>
										<Input type="password" placeholder="password" {...field} />
									</FormControl>
									<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button className="md:right-8 md:top-8 w-full" type="submit" disabled={isLoading}>
						{isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> }
						Sign In
						</Button>
					</form>
				</Form>
				<p className="px-8 text-center text-sm text-muted-foreground">
					<span
						className="cursor-pointer hover:text-brand hover:underline underline-offset-2"
					>
						Don&apos;t have an account? Sign Up
					</span>
				</p>
			</div>
		</div>
	);
};

export default LoginScreen;
