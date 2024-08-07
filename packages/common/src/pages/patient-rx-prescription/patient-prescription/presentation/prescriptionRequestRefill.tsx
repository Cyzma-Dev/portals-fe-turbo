import React, { useEffect, useState } from "react"
import { Button, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Icons, Popover, PopoverContent, PopoverTrigger, ScrollArea, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, IOptions, Input, DateTimePicker } from "@repo/ui/shadcn";
import { cn } from "@repo/ui/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IRequestRefillCommonProps } from "./types";
import { RefillRequestSchema } from "./schema";

interface IPrescriptionRequestRefillProps extends IRequestRefillCommonProps {
    activeAddressOptions: IOptions[];
}
export const PrescriptionRequestRefill = (props: IPrescriptionRequestRefillProps) => {

    const [comboBoxOpen, setComboBoxOpen] = useState(false); RefillRequestSchema
    const dynamicMedicationSchema: Record<string, z.ZodType<any, any>> = {}
    const dynamicNoteSchema: Record<string, z.ZodType<any, any>> = {}
    const dynamicDateSchema: Record<string, z.ZodType<any, any>> = {}
    const RefillRequestSchemaExtend = RefillRequestSchema.extend(dynamicMedicationSchema).extend(dynamicNoteSchema).extend(dynamicDateSchema)
    const medicationList: { id: number; display_text: string }[] = []
    let inputFieldId: any = {}

    for (const list of props.currentPrescription) {
        medicationList.push({
            id: list.id,
            display_text: list.drug_name
        })
        inputFieldId = { ...inputFieldId, [list.drug_name]: list.id }

        dynamicMedicationSchema[list.drug_name] = z.number();
        dynamicDateSchema[`${list.drug_name}_date`] = z.date();
        dynamicNoteSchema[`${list.drug_name}_note`] = z.string().optional();
    }


    const onSubmit = async (formData: z.infer<typeof RefillRequestSchemaExtend>) => {
        alert(JSON.stringify(formData, null, 2));
        console.log(formData, "formDataformDataformDataformDataformData");

        const result: { address: number; rx: number; needed_date: string; patient_note: string }[] = [];
        const address = formData.address;

        for (const key in formData) {
            if (Object.prototype.hasOwnProperty.call(formData, key) && !key.includes("_note") && !key.includes("_date") && key !== "address") {
                const medication = key;
                const date = formData[`${medication}_date`];

                // Convert date to YYYY-MM-DD format if it's a Date object
                const needed_date = date instanceof Date
                    ? date.toISOString().split('T')[0]
                    : "";

                result.push({
                    address: address,
                    rx: formData[medication],
                    needed_date: needed_date,
                    patient_note: formData[`${medication}_note`]
                });
            }
        }

        console.log(result, "resultresultresult");
        props.handlePrescriptionRequestSubmit(result);
    };

    const form = useForm<z.infer<typeof RefillRequestSchemaExtend>>({
        resolver: zodResolver(RefillRequestSchemaExtend),
        defaultValues: {
            note: '',

        },
    })



    useEffect(() => {
        if (props.currentPrescription && props.sheetOpen) {
            form.reset(inputFieldId)
        }
        // if (!props.sheetOpen) {
        //     // props.setIsEdit(false)
        //     props.setCurrentPrescription(undefined)
        //     form.reset({
        //         rx: 0,
        //         note: '',
        //     });
        // }
    }, [props.currentPrescription, props.sheetOpen])



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
                                    <SheetTitle>{'Prescription Request Refill'}</SheetTitle>
                                    <SheetDescription>
                                        {'Request Refill by filling the following details'}
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="flex flex-col gap-4 p-4">

                                    <div className="grid w-full items-center gap-4">
                                        <FormField
                                            control={form.control}
                                            name="address"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel className="text-base">Shipping Address</FormLabel>
                                                    <Popover open={comboBoxOpen} onOpenChange={setComboBoxOpen}>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    disabled={props.isBtnDisable}
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    className={cn(
                                                                        "w-full justify-between",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value
                                                                        ? props.activeAddressOptions.find(
                                                                            (language) => language.id === field.value
                                                                        )?.display_text
                                                                        : "Select Address"}
                                                                    <Icons.chevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-[200px] p-0">
                                                            <Command>
                                                                <CommandInput placeholder="Search address..." />
                                                                <CommandEmpty>No Address found.</CommandEmpty>
                                                                <CommandGroup>
                                                                    {props.activeAddressOptions.map((address) => (
                                                                        <CommandList key={address.id}>
                                                                            <CommandItem
                                                                                key={address.display_text}
                                                                                value={address.display_text}
                                                                                onSelect={() => {
                                                                                    form.setValue("address", address.id)
                                                                                    setComboBoxOpen(false)
                                                                                }}
                                                                            >
                                                                                <Icons.check
                                                                                    className={cn(
                                                                                        "mr-2 h-4 w-4",
                                                                                        address.id === field.value
                                                                                            ? "opacity-100"
                                                                                            : "opacity-0"
                                                                                    )}
                                                                                />
                                                                                {address.display_text}
                                                                            </CommandItem>
                                                                        </CommandList>
                                                                    ))}
                                                                </CommandGroup>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {
                                            medicationList.map((drug) => (
                                                <>
                                                    <FormField
                                                        control={form.control}
                                                        name={drug.display_text as any}
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col">
                                                                <FormLabel className="text-base">Medication name</FormLabel>
                                                                <Popover open={false}>
                                                                    <PopoverTrigger asChild>
                                                                        <FormControl>
                                                                            <Button
                                                                                disabled={props.isBtnDisable}
                                                                                variant="outline"
                                                                                role="combobox"
                                                                                className={cn(
                                                                                    "w-full justify-between",
                                                                                    !field.value && "text-muted-foreground"
                                                                                )}
                                                                            >
                                                                                {drug.display_text}
                                                                                <Icons.chevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                            </Button>
                                                                        </FormControl>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent className="w-[200px] p-0">
                                                                        <Command>
                                                                            <CommandInput placeholder="Search address..." />
                                                                            <CommandEmpty>No Medication Found.</CommandEmpty>
                                                                            <CommandGroup>
                                                                                <CommandList key={drug.id}>
                                                                                    <CommandItem
                                                                                        key={drug.display_text}
                                                                                        value={drug.id}
                                                                                    // onSelect={() => {
                                                                                    //     form.setValue("rx", drug.id)
                                                                                    // }}
                                                                                    >
                                                                                        {drug.display_text}
                                                                                    </CommandItem>
                                                                                </CommandList>
                                                                            </CommandGroup>
                                                                        </Command>
                                                                    </PopoverContent>
                                                                </Popover>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />


                                                    <FormField
                                                        control={form.control}
                                                        name={`${drug.display_text}_date`}
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col gap-2">
                                                                <FormControl>
                                                                    <DateTimePicker
                                                                        value={new Date(new Date().setDate(new Date().getDate() + 1))}
                                                                        minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                                                                        onChange={field.onChange} enableTimePicker={false} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />




                                                    <div className="flex flex-col space-y-1.5">
                                                        <FormField
                                                            control={form.control}
                                                            name={`${drug.display_text}_note`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <div className="space-y-0.5">
                                                                        <FormLabel className="text-base">Additional Notes</FormLabel>
                                                                    </div>
                                                                    <FormControl>
                                                                        <Input disabled={props.isBtnDisable} placeholder="Notes" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </>

                                            ))
                                        }

                                        {/* <div className="flex flex-col space-y-1.5">
                                            <FormField
                                                control={form.control}
                                                name="note"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <div className="space-y-0.5">
                                                            <FormLabel className="text-base">Notes</FormLabel>
                                                        </div>
                                                        <FormControl>
                                                            <Input disabled={props.isBtnDisable} placeholder="Notes" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div> */}
                                    </div>
                                    <SheetFooter className=" gap-2">
                                        <SheetClose asChild>
                                            <Button disabled={props.isBtnDisable} variant="secondary" className="w-fit">
                                                {'Cancel'}
                                            </Button>
                                        </SheetClose>
                                        <Button disabled={props.isBtnDisable} className="md:right-8 md:top-8 w-fit" type="submit">
                                            {props.isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                                            {'Submit'}
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