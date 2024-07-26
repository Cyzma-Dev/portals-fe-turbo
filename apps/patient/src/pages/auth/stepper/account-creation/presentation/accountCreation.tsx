import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input } from '@repo/ui/shadcn';
import { useForm } from 'react-hook-form';
import { IPatientSignUpRequest } from '../../../login/presentation/types';
import { accountCreationSchema } from './schema';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import InputFieldFormatterHooks from '../../../../../../../../packages/common/src/helper-methods/input-field-formatter';
import { IAccountCreationTypes } from './types';
import { useState } from 'react';
import usePasswordPolicySchemeHooks from '../../../../../../../../packages/common/src/common-hooks/usePasswordPolicySchemeHooks';
import PasswordPolicyTicks from '../../../../../../../../packages/ui/src/components/passwordPolicyTicks';
import omit from '../../../../../../../../packages/common/src/helper-methods/omit-property';

interface IAccountCreationProps {
    patientSignUpHandler: (formData: IPatientSignUpRequest) => void
}

const AccountCreation = (props: IAccountCreationProps) => {
    const {
		handleUsername,
		handleNewPassword,
		handleConfirmPassword,
		isNumbers,
		isLowers,
		isEnabledOnChangePassword,
		isSpecials,
		isUppers,
		isPasswordMatch,
		isPasswordValue
	} = usePasswordPolicySchemeHooks();
    const { normalizeInput } = InputFieldFormatterHooks();

    const [isMobile, setIsMobile] = useState<string>('');
    const [showPolicy, setShowPolicy] = useState(false);
    const [isPassword, setIsPassword] = useState('')
    const onVerificationSubmit = (data: IAccountCreationTypes) => {

        if (isEnabledOnChangePassword) {
			const signUpRequest = {
				...data,
                ...omit(data, ['confirm_password']),
                roles: ['Patient'],
			};
			props?.patientSignUpHandler(signUpRequest);
		}
    };

    const form = useForm<z.infer<typeof accountCreationSchema>>({
		resolver: zodResolver(accountCreationSchema),
        defaultValues:{
            username: '',
            phone: '',
            password: '',
            confirm_password: ''
        }
	})

    return (
        <div className="w-full mx-auto flex w-full flex-col justify-center space-y-2">
            <div className="flex flex-col text-center">
                <p className="text-md font-bold text-foreground">
                    Create an Account
                </p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onVerificationSubmit)}>
                    <div className="flex flex-col gap-4 py-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="example@gmail.com"
                                        onChange={(e)=>{
                                            field.onChange(e)
                                            handleUsername(e)
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Phone No"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            field.onChange(e);
                                            setIsMobile(normalizeInput(e.target.value));
                                        }}
                                        value={isMobile}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder="Password"
                                        onChange={(e) => {
                                            field.onChange(e);
                                            handleNewPassword(e);
                                            setIsPassword(e.target.value)
                                        }}
                                        onFocus={() => setShowPolicy(true)}
                                        onBlur={() => setShowPolicy(true)}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirm_password"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder="Confirm Password"
                                        onChange={(e) => {
                                            field.onChange(e);
                                            handleConfirmPassword(e);
                                        }}  
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {isPassword && showPolicy &&
                        <PasswordPolicyTicks
                            isNumbers={isNumbers}
                            isUppers={isUppers}
                            isLowers={isLowers}
                            isSpecials={isSpecials}
                            isPasswordMatch={isPasswordMatch}
                            isPasswordValue={isPasswordValue}
                        />
                    }
                    <Button
                        className="md:right-8 md:top-8 w-full"
                        type="submit"
                    >
                        Submit Details
                    </Button>
                </form>
            </Form>

        </div>
    )
}

export default AccountCreation