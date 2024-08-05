import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Icons, Input, ScrollArea, Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@repo/ui/shadcn"
import { addPatientComorbidConditionsSchema, editPatientComorbidConditionsSchema } from "./schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useEffect } from "react"
import { IComorbidCommonProps } from "./types"
import MultipleSelectorAutocomplete from "../../../../../../ui/src/components/multipleSelectorAutocomplete"
import { PatientComorbidOptionsHook } from "../../../../common-hooks/patientComorbidOptionsHook"



interface IAddPatientComorbidConditions extends IComorbidCommonProps {
}
export const AddPatientComorbidConditions = (props: IAddPatientComorbidConditions) => {

    const { patientComorbidOptionsData, fetchData } = PatientComorbidOptionsHook();
    const checkPatientAllergiesSchema = props.isEdit ? editPatientComorbidConditionsSchema : addPatientComorbidConditionsSchema;


    useEffect(() => {
        // This effect will triggered to fetch Allergies subject options
        fetchData();
    }, [props.sheetOpen]);

    const onSubmit = async (formData: z.infer<typeof checkPatientAllergiesSchema>) => {
        formData.condition_value_ids = props.isEdit ? formData.condition_value_ids : formData.condition_value_ids.map((value: any) => value.id);
        props.handleSubmit(formData);
    };

    const form = useForm<z.infer<typeof checkPatientAllergiesSchema>>({
        resolver: zodResolver(checkPatientAllergiesSchema),
        defaultValues: {
            condition_value_ids: [],
            notes: '',
        },
    });
    useEffect(() => {
        if (props.currentComorbidConditions && props.isEdit && props.sheetOpen) {
            form.reset(props.currentComorbidConditions);
        }
        if (!props.sheetOpen) {
            props.setIsEdit(false);
            props.setCurrentComorbidConditions(undefined);
            form.reset({
                condition_value_ids: [],
                notes: '',
            });
        }
    }, [props.currentComorbidConditions, props.sheetOpen]);

    return (
        <Sheet open={props.sheetOpen} onOpenChange={props.setSheetOpen}>
            <SheetContent
                className="p-0 "
                onOpenAutoFocus={(e: any) => e.preventDefault()}
            >
                <div className="h-full">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <ScrollArea>
                                <SheetHeader>
                                    <SheetTitle>{props.isEdit ? 'Edit Allergies' : 'Add Allergy'}</SheetTitle>
                                    <SheetDescription>
                                        {props.isEdit
                                            ? 'Edit the Allergies details'
                                            : 'Create new Allergies by filling the following details'
                                        }
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="flex flex-col gap-4 p-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <FormField
                                            control={form.control}
                                            name="condition_value_ids"
                                            render={({ field: { onChange, value, ref } }) => (
                                                <FormItem>
                                                    <div className="space-y-0.5">
                                                        <FormLabel className="text-base">Comorbid Condition</FormLabel>
                                                    </div>
                                                    <FormControl>
                                                        <MultipleSelectorAutocomplete
                                                            value={value ?? []}
                                                            isEdit={props.isEdit}
                                                            disabled={props.isEdit}
                                                            ref={ref}
                                                            onChange={onChange}
                                                            defaultOptions={patientComorbidOptionsData}
                                                            placeholder="Select options"
                                                            emptyIndicator={
                                                                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                                    no results found.
                                                                </p>
                                                            }
                                                        />

                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-4">
                                        <FormField
                                            control={form.control}
                                            name="notes"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="space-y-0.5">
                                                        <FormLabel className="text-base">Note</FormLabel>
                                                    </div>
                                                    <FormControl>
                                                        <Input disabled={!props.isEdit} placeholder="Note" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />


                                    </div>
                                    <SheetFooter className=" gap-2">
                                        <SheetClose asChild>
                                            <Button disabled={props.isBtnDisable} variant="secondary" className="w-fit">
                                                {props.isEdit ? 'Discard' : 'Cancel'}
                                            </Button>
                                        </SheetClose>
                                        <Button disabled={props.isBtnDisable} className="md:right-8 md:top-8 w-fit" type="submit">
                                            {props.isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                                            {props.isEdit ? 'Update' : 'Submit'}
                                        </Button>
                                    </SheetFooter>
                                </div>
                            </ScrollArea>
                        </form>
                    </Form>
                </div>
            </SheetContent>
        </Sheet>
    );
};