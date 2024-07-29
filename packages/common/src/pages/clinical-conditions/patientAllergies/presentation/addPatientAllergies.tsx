import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Icons, Input, ScrollArea, Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetDescription, , SheetFooter } from "@repo/ui/shadcn"
import { addPatientAllergiesSchema } from "./schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useEffect } from "react"
import { IAllergiesCommonProps } from "./types"
import { PatientAllergiesOptionsHook } from "../../../../common-hooks"
import MultipleSelectorAutocomplete, { OptionProps } from "../../../../../../ui/src/components/multipleSelectorAutocomplete"


interface IAddPatientAllergies extends IAllergiesCommonProps {
}
export const AddPatientAllergies = (props: IAddPatientAllergies) => {

    const { patientAllergiesOptionsData, fetchData } = PatientAllergiesOptionsHook();


    useEffect(() => {
        // This effect will triggered to fetch Allergies subject options
        props.sheetOpen && fetchData();
    }, [props.sheetOpen]);

    const onSubmit = async (formData: z.infer<typeof addPatientAllergiesSchema>) => {
        console.log(formData, 'aleracare..localhost:5173')
        props.handleSubmit(formData)
    }

    const form = useForm<z.infer<typeof addPatientAllergiesSchema>>({
        resolver: zodResolver(addPatientAllergiesSchema),
        defaultValues: {
            subject_id: 0,
            note_text: '',
        },
    })

    useEffect(() => {
        if (props.currentAllergies && props.isEdit && props.sheetOpen) {
            form.reset(props.currentAllergies)
        }
        if (!props.sheetOpen) {
            props.setIsEdit(false)
            props.setCurrentAllergies(undefined)
            form.reset({
                subject_id: 0,
                note_text: '',
            });
        }
    }, [props.currentAllergies, props.sheetOpen])
    const OPTIONS: any[] = [
        { label: 'nextjs', value: 'nextjs', id: 45 },
        { label: 'React', value: 'react', id: 78 },
        { label: 'Remix', value: 'remix', id: 56 },
        { label: 'Vite', value: 'vite', id: 36 },
        { label: 'Nuxt', value: 'nuxt', id: 36 },
        { label: 'Vue', value: 'vue', id: 25 },
        { label: 'Svelte', value: 'svelte', id: 57 },
        { label: 'Angular', value: 'angular', id: 21 },
        { label: 'Ember', value: 'ember', disable: true, id: 35 },
        { label: 'Gatsby', value: 'gatsby', disable: true, id: 10 },
        { label: 'Astro', value: 'astro' },
    ];


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
                                            name="subject_id"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="space-y-0.5">
                                                        <FormLabel className="text-base">Allergies</FormLabel>
                                                    </div>
                                                    <FormControl>
                                                        <MultipleSelectorAutocomplete
                                                            defaultOptions={OPTIONS}
                                                            placeholder="Select frameworks you like..."
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
                                            name="note_text"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="space-y-0.5">
                                                        <FormLabel className="text-base">Note</FormLabel>
                                                    </div>
                                                    <FormControl>
                                                        <Input disabled={props.isBtnDisable} placeholder="Note" {...field} />
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
    )
}