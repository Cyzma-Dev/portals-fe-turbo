import React, { useEffect, useState } from "react"
import { IDocumentsCommonProps } from "./type";
import { DocumentTypeOptionsHook } from "../../../common-hooks";
import { Button, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Icons, Input, Popover, PopoverContent, PopoverTrigger, FileUpload, ScrollArea, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@repo/ui/shadcn";
import { cn } from "@repo/ui/utils";
import { z } from "zod";
import { addDocumentsSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface IDocumentsProps extends IDocumentsCommonProps {

}
export const AddDocuments = (props: IDocumentsProps) => {
    const { documentOptionsData, fetchData } = DocumentTypeOptionsHook();

    const [open, setOpen] = useState(false);
    const [binaryData, setBinaryData] = useState<any | null>(null);

    useEffect(() => {
        // This effect will triggered to fetch Documents subject options
        props.sheetOpen && fetchData();
    }, [props.sheetOpen]);

    const onSubmit = async (formData: z.infer<typeof addDocumentsSchema>) => {
        const data = {
            ...formData,
            document: binaryData
        }
        props.handleSubmit(data)

    }

    const form = useForm<z.infer<typeof addDocumentsSchema>>({
        resolver: zodResolver(addDocumentsSchema),
        defaultValues: {
            document_name: '',
            subject: 0,
            note: '',
        },
    })

    useEffect(() => {
        if (props.currentDocument && props.isEdit && props.sheetOpen) {
            form.reset(props.currentDocument)
        }
        if (!props.sheetOpen) {
            props.setIsEdit(false)
            props.setCurrentDocument(undefined)
            form.reset({
                document_name: '',
                subject: 0,
                note: '',
            });
        }
    }, [props.currentDocument, props.sheetOpen])

    const handleFileChange = (file: File, binaryData: any) => {
        if (
            file.type === 'image/jpg' ||
            file.type === 'image/jpeg' ||
            file.type === 'image/png' ||
            file.type === 'application/pdf'
        ) {
            setBinaryData(binaryData);
        } else {
            toast.error('Invalid File Type');
            setBinaryData(null);
            // resetField('patient_document');
        }
    };

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
                                    <SheetTitle>{props.isEdit ? 'Edit Document' : 'Add Document'}</SheetTitle>
                                    <SheetDescription>
                                        {props.isEdit
                                            ? 'Edit the Document details'
                                            : 'Create new Document by filling the following details'
                                        }
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="flex flex-col gap-4 p-4">
                                    <div className="flex flex-col space-y-1.5">
                                        {props.isEdit
                                            ?
                                            null
                                            :
                                            <FileUpload
                                                name='patient_document'
                                                control={form.control}
                                                onChange={handleFileChange}
                                                disabled={props.isBtnDisable}
                                            />
                                        }

                                        <FormField
                                            control={form.control}
                                            name="document_name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="space-y-0.5">
                                                        <FormLabel className="text-base">Document Name</FormLabel>
                                                    </div>
                                                    <FormControl>
                                                        <Input disabled={props.isBtnDisable} placeholder="Document Name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-4">
                                        <FormField
                                            control={form.control}
                                            name="subject"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel className="text-base">Document Subject</FormLabel>
                                                    <Popover open={open} onOpenChange={setOpen}>
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
                                                                        ? documentOptionsData.find(
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
                                                                    {documentOptionsData.map((subject) => (
                                                                        <CommandList key={subject.id}>
                                                                            <CommandItem
                                                                                key={subject.display_text}
                                                                                value={subject.display_text}
                                                                                onSelect={() => {
                                                                                    form.setValue("subject", subject.id)
                                                                                    setOpen(false)
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
                </div>
            </SheetContent>
        </Sheet>
    )
}