import { Button, DateTimePicker, Form, FormControl, FormField, FormItem, FormMessage, Icons, Input } from '@repo/ui/shadcn'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { IVerificationTypes } from './type'
import { verificationSchema } from './schema'
import { DateTimeFormat, DateUtility } from '@repo/common/common-library'

interface IVerificationProps {
    isBtnDisable: boolean;
	isLoading: boolean;
    patientVerificationHandler: (requestData: IVerificationTypes) => void
}

const Verification = (props: IVerificationProps) => {

    const onVerificationSubmit = (data: IVerificationTypes) => {
        const formData = {
            ...data,
        }
        // @ts-expect-error needs to convert to yyyy-mm-dd
        formData.dob = DateUtility.dateToString(
            new Date(formData.dob),
            DateTimeFormat.yearToDate
        );
        props.patientVerificationHandler(formData);

    };

    const form = useForm<z.infer<typeof verificationSchema>>({
		resolver: zodResolver(verificationSchema),
        defaultValues:{
            last_name: '',
            rx_number: '',
            dob: undefined,
            zip_code: undefined
        }
	})

    return (
        <div className="mx-auto flex w-full flex-col justify-center space-y-3">
            <div className="flex flex-col text-center">
                <p className="text-md font-bold text-foreground">
                    Verify your identity
                </p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onVerificationSubmit)}>
                    <div className="flex flex-col gap-4 py-2 pb-6">
                        <FormField
                            control={form.control}
                            name="last_name"
                            disabled={props.isLoading}
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                    <Input placeholder="Last Name" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="rx_number"
                            disabled={props.isLoading}
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                    <Input placeholder="Rx#" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dob"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                <FormControl>
                                    <DateTimePicker value={field.value} onChange={field.onChange} enableTimePicker={false}/>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="zip_code"
                            disabled={props.isLoading}
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                    <Input type='number' placeholder="Zip Code" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button className="md:right-8 md:top-8 w-full" type="submit" disabled={props.isLoading}>
                    {props.isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> }
                        Verify Details
                    </Button>
                </form>
            </Form>

        </div>
    )
}

export default Verification