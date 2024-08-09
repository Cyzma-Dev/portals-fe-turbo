import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Icons, Input, ScrollArea, Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetDescription, Popover, PopoverTrigger, PopoverContent, Command, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandList, SheetFooter } from "@repo/ui/shadcn"
import { addPatientNotesSchema } from "./schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useEffect, useState } from "react"
import { cn } from "@repo/ui/utils"
import { SubjectTypeOptionsHook } from "../../../common-hooks/subjectTypeOptionsHook"
import { INotesCommonProps } from "./types"

interface IAddPatientNotes extends INotesCommonProps {
}
export const AddPatientNotes = (props: IAddPatientNotes) => {
    const { subjectOptionsData, fetchData } = SubjectTypeOptionsHook();

    const [comboBoxOpen, setComboBoxOpen] = useState(false);

    useEffect(() => {
        // This effect will triggered to fetch notes subject options
        props.sheetOpen && fetchData();
    }, [props.sheetOpen]);

    const onSubmit = async (formData: z.infer<typeof addPatientNotesSchema>) => {
        props.handleSubmit(formData)
    }

    const form = useForm<z.infer<typeof addPatientNotesSchema>>({
        resolver: zodResolver(addPatientNotesSchema),
        defaultValues: {
            subject_id: 0,
            note_text: '',
        },
    })

    useEffect(() => {
        if (props.currentNotes && props.isEdit && props.sheetOpen) {
            form.reset(props.currentNotes)
        }
        if (!props.sheetOpen) {
            props.setIsEdit(false)
            props.setCurrentNotes(undefined)
            form.reset({
                subject_id: 0,
                note_text: '',
            });
        }
    }, [props.currentNotes, props.sheetOpen])

    return (
        <Sheet open={props.sheetOpen} onOpenChange={props.setSheetOpen}>
            <SheetContent
                className="p-0 "
                onOpenAutoFocus={(e: any) => e.preventDefault()}
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <ScrollArea className="h-screen">
                            <SheetHeader>
                                <SheetTitle>{props.isEdit ? 'Edit Notes' : 'Add Notes'}</SheetTitle>
                                <SheetDescription>
                                    {props.isEdit
                                        ? 'Edit the note details'
                                        : 'Create new note by filling the following details'
                                    }
                                </SheetDescription>
                            </SheetHeader>
                            <div className="flex flex-col gap-4 p-4">
                                <div className="grid w-full items-center gap-4">
                                    <FormField
                                        control={form.control}
                                        name="subject_id"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel className="text-base">Subject</FormLabel>
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
                                                                    ? subjectOptionsData.find(
                                                                        (language) => language.id === field.value
                                                                    )?.display_text
                                                                    : "Select Subject"}
                                                                <Icons.chevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-[200px] p-0">
                                                        <Command>
                                                            <CommandInput placeholder="Search subject..." />
                                                            <CommandEmpty>No language found.</CommandEmpty>
                                                            <CommandGroup>
                                                                {subjectOptionsData.map((subject) => (
                                                                    <CommandList key={subject.id}>
                                                                        <CommandItem
                                                                            key={subject.display_text}
                                                                            value={subject.display_text}
                                                                            onSelect={() => {
                                                                                form.setValue("subject_id", subject.id)
                                                                                setComboBoxOpen(false)
                                                                            }}
                                                                        >
                                                                            <Icons.check
                                                                                className={cn(
                                                                                    "mr-2 h-4 w-4",
                                                                                    subject.id === field.value
                                                                                        ? "opacity-100"
                                                                                        : "opacity-0"
                                                                                )}
                                                                            />
                                                                            {subject.display_text}
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

                                    <div className="flex flex-col space-y-1.5">
                                        <FormField
                                            control={form.control}
                                            name="note_text"
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
                                    </div>
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
            </SheetContent>
        </Sheet>
    )
}