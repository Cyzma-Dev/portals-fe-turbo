import React, { useEffect, useState } from 'react'
import { Button, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Icons, Input, Popover, PopoverContent, PopoverTrigger, ScrollArea, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@repo/ui/shadcn'
import { IAddNewAddressProps } from './types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addNewAddressSchema } from './schema'
import { z } from 'zod'
import { cn } from '@repo/ui/utils'
import { AddressCityOptionsHook, AddressStateOptionsHook, AddressTypeOptionsHook, AddressZipOptionsHook } from '../../../../common-hooks'
import { toast } from 'sonner'


interface IPatientAddNewAddressProps extends IAddNewAddressProps {
    isEditMode?: boolean
    currentAddress?: any
    // enableLoader: (data: boolean) => void
    loading?: boolean
}


function PatientAddNewAddress(props: IPatientAddNewAddressProps) {
    const { fetchStateList, stateList } = AddressStateOptionsHook();
    const { addressOptionsData, fetchAddressTypeData } = AddressTypeOptionsHook();
    const { cityList, setStateId, stateId, setCityList, isCityLoading, stateBasedCityList, setStateBasedCityList } = AddressCityOptionsHook();
    const { zipCodeList, setCityId, cityId, setZipCodeList, isZipLoading, cityBasedZipCodeList, setCityBasedZipCodeList } = AddressZipOptionsHook();

    console.log(cityList, 'cityList')
    const [stateComboBoxOpen, setStateComboBoxOpen] = useState<boolean>(false)
    const [cityComboBoxOpen, setCityComboBoxOpen] = useState<boolean>(false)
    const [addressTypeComboBoxOpen, setAddressTypeComboBoxOpen] = useState<boolean>(false)
    const [zipCodeComboBoxOpen, setZipCodeComboBoxOpen] = useState<boolean>(false)

    const [stateValHandle, setStateValHandle] = useState<any | null>(null);
    const [cityValHandle, setCityValHandle] = useState<any | null>(null);
    const [isLazyLoad, setIsLazyLoad] = useState<boolean>(true);
    const [isCityOptionsClear, setIsCityOptionsClear] = useState<boolean>(false);
    const [isZipCodeOptionsClear, setIsZipCodeOptionsClear] = useState<boolean>(false);

    useEffect(() => {
        fetchStateList();
        fetchAddressTypeData()
    }, [props.addNewAddressSheetOpen])

    const onSubmit = async (formData: z.infer<typeof addNewAddressSchema>) => {

        console.log(formData, "resultresultresult");
        // props.handlePrescriptionRequestSubmit(result);
    };

    const form = useForm<z.infer<typeof addNewAddressSchema>>({
        resolver: zodResolver(addNewAddressSchema),
        defaultValues: {
            address: "",
            state_id: 0,
            city_id: 0,
            address_type_id: 0,
            zip_code_id: 0,

        },
    })


    // useEffect(() => {
    //     props?.enableLoader(props?.loading);
    // }, [props?.loading]);

    useEffect(() => {
        if (stateValHandle) {
            setStateId(stateValHandle?.id);
        }
    }, [stateValHandle]);

    useEffect(() => {
        if (cityValHandle) {
            setCityId(cityValHandle?.id);
        }
    }, [cityValHandle]);

    useEffect(() => {
        if (props.isEditMode) {
            setStateId(props.currentAddress?.state_id);
            setCityId(props.currentAddress?.city_id);
            form.reset(props.currentAddress ?? {});
        }
        form.reset({});
    }, [props.currentAddress]);

    const handleChangeState = (value: any) => {
        console.log(value, "handleChangeState")
        cityId && setZipCodeList([]);
        stateId && setCityList([]);
        form.resetField('city_id', { keepError: true });
        form.resetField('zip_code_id', { keepError: true });
        form.setValue('city_id', 0);
        form.setValue('zip_code_id', 0);
        if (value) {
            if (typeof value === 'string') {
                const enteredState = stateList?.find((state: any) => {
                    return state?.display_text?.toLowerCase() === value?.toLowerCase();
                });
                if (!enteredState) {
                    toast.error("Invalid state");
                    form.resetField('state_id', { keepError: true });
                    form.setValue('state_id', 0);
                    return;
                }
                form.resetField('state_id', { keepError: true });
                form.setValue('state_id', enteredState?.id);
                setStateId(enteredState?.id);
            }
            else {
                setStateValHandle(value);
            }
        }
        setCityValHandle(null);
        if (!value) {
            setStateId(0);
            setCityId(0);
            setIsLazyLoad(true);
            setStateValHandle(null);
        }

        setIsCityOptionsClear(true);
        setIsZipCodeOptionsClear(true);
        setTimeout(() => {
            setIsCityOptionsClear(false);
            setIsZipCodeOptionsClear(false);
        }, 0);
    };

    const handleChangeCity = (value: any) => {
        console.log(value, "handleChangeCity")
        cityId && setZipCodeList([]);
        form.resetField('zip_code_id', { keepError: true });
        form.setValue('zip_code_id', 0);
        setIsZipCodeOptionsClear(true);
        setTimeout(() => {
            setIsZipCodeOptionsClear(false);
        }, 0);

        if (value) {
            setIsLazyLoad(false);
            if (typeof value === 'string') {
                const enteredCity = cityList?.find((city: any) => {
                    return city?.city?.toLowerCase() === value?.toLowerCase();
                });
                if (!enteredCity) {
                    toast.error("Invalid city");
                    form.resetField('city_id', { keepError: true });
                    form.setValue('city_id', 0);
                    return;
                }
                setStateId(0);
                setCityId(enteredCity?.id);
                const populatedState = stateList?.find((state: any) => state?.id === enteredCity?.lookup_item_id);
                form.resetField('city_id', { keepError: true });
                form.setValue('city_id', enteredCity?.id);
                form.resetField('state_id', { keepError: true });
                form.setValue('state_id', populatedState?.id);
            }
            else {
                form.resetField('state_id', { keepError: true });
                form.setValue('state_id', value?.lookup_item_id);
                setCityValHandle(value);
            }
            return;
        }

        setCityId(0);
        setCityValHandle(null);
        setIsLazyLoad(true);

        // resetField('state_id', { keepError: true });
        // setValue('state_id', null);
    };

    const handleZipCodeChange = (value: any) => {
        console.log(value, "handleZipCodeChange")
        // reset({ 'city_id': value.city_id,'state_id': populatedState.id });
        if (value) {
            setIsLazyLoad(false);
            if (typeof value === 'string' && value) {
                const enteredZipcode = zipCodeList?.find((zipcode: any) => {
                    return zipcode?.zipcode === +(value);
                });
                if (!enteredZipcode) {
                    toast.error("Invalid zipcode");
                    form.resetField('zip_code_id', { keepError: true });
                    form.setValue('zip_code_id', 0);
                    return;
                }
                setStateId(0);
                setCityId(0);
                const cityPopulated = cityList?.find((city: any) => {
                    return city?.id === enteredZipcode?.city_id;
                });
                const populatedState = stateList?.find((state: any) => state?.id === cityPopulated?.lookup_item_id);
                form.resetField('zip_code_id', { keepError: true });
                form.setValue('zip_code_id', enteredZipcode?.id);
                form.resetField('city_id', { keepError: true });
                form.setValue('city_id', enteredZipcode?.city_id);
                form.resetField('state_id', { keepError: true });
                form.setValue('state_id', populatedState?.id);
            }
            else {
                const cityPopulated = cityList?.find((city: any) => {
                    return city?.id === value?.city_id;
                });

                const populatedState = stateList?.find((state: any) => state?.id === cityPopulated?.lookup_item_id);
                !cityId && setStateId(0);
                form.resetField('city_id', { keepError: true });
                form.setValue('city_id', value?.city_id);
                form.resetField('state_id', { keepError: true });
                form.setValue('state_id', populatedState?.id);
            }
        }
    };


    useEffect(() => {
        if (props.addNewAddressSheetOpen) {
            form.reset()

        }
        // if (!props.sheetOpen) {
        //     // props.setIsEdit(false)
        //     props.setCurrentPrescription(undefined)
        //     form.reset({
        //         rx: 0,
        //         note: '',
        //     });
        // }
    }, [props.addNewAddressSheetOpen])



    return (
        <Sheet open={props.addNewAddressSheetOpen} onOpenChange={props.setNewAddressSheetOpen}>
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
                                    <div className="flex flex-col space-y-1.5">
                                        <FormField
                                            control={form.control}
                                            name="address"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="space-y-0.5">
                                                        <FormLabel className="text-base">Address</FormLabel>
                                                    </div>
                                                    <FormControl>
                                                        <Input disabled={props.newAddressBtnDisable} placeholder="Address" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-4">
                                        <FormField
                                            control={form.control}
                                            name="state_id"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel className="text-base">State</FormLabel>
                                                    <Popover open={stateComboBoxOpen} onOpenChange={setStateComboBoxOpen}>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    disabled={props.newAddressBtnDisable}
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    className={cn(
                                                                        "w-full justify-between",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value
                                                                        ? stateList.find(
                                                                            (language) => language.id === field.value
                                                                        )?.display_text
                                                                        : "Select State"}
                                                                    <Icons.chevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-[200px] p-0">
                                                            <Command>
                                                                <CommandInput placeholder="Search State..." />
                                                                <CommandEmpty>No State found.</CommandEmpty>
                                                                <CommandGroup>
                                                                    {stateList.map((subject) => (
                                                                        <CommandList key={subject.id}>
                                                                            <CommandItem
                                                                                key={subject.display_text}
                                                                                value={subject.display_text}
                                                                                onSelect={() => {
                                                                                    form.setValue("state_id", subject.id)
                                                                                    setStateComboBoxOpen(false)
                                                                                    handleChangeState(subject)
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

                                        <FormField
                                            control={form.control}
                                            name="city_id"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel className="text-base">City</FormLabel>
                                                    <Popover open={cityComboBoxOpen} onOpenChange={setCityComboBoxOpen}>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    disabled={props.newAddressBtnDisable}
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    className={cn(
                                                                        "w-full justify-between",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value
                                                                        ? cityList.find(
                                                                            (language) => language.id === field.value
                                                                        )?.city
                                                                        : "Select City"}
                                                                    <Icons.chevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-[200px] p-0">
                                                            <Command>
                                                                <CommandInput placeholder="Search city..." />
                                                                <CommandEmpty>No city found.</CommandEmpty>
                                                                <CommandGroup>
                                                                    {cityList.map((subject) => (
                                                                        <CommandList key={subject.id}>
                                                                            <CommandItem
                                                                                key={subject.city}
                                                                                value={subject.city}
                                                                                onSelect={() => {
                                                                                    form.setValue("city_id", subject.id)
                                                                                    setCityComboBoxOpen(false)
                                                                                    handleChangeCity(subject)
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
                                                                                {subject.city}
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


                                        <FormField
                                            control={form.control}
                                            name="address_type_id"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel className="text-base">Address Type</FormLabel>
                                                    <Popover open={addressTypeComboBoxOpen} onOpenChange={setAddressTypeComboBoxOpen}>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    disabled={props.newAddressBtnDisable}
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    className={cn(
                                                                        "w-full justify-between",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value
                                                                        ? addressOptionsData.find(
                                                                            (language) => language.id === field.value
                                                                        )?.display_text
                                                                        : "Select Address Type"}
                                                                    <Icons.chevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-[200px] p-0">
                                                            <Command>
                                                                <CommandInput placeholder="Search Address Type..." />
                                                                <CommandEmpty>No Address Type found.</CommandEmpty>
                                                                <CommandGroup>
                                                                    {addressOptionsData.map((subject) => (
                                                                        <CommandList key={subject.id}>
                                                                            <CommandItem
                                                                                key={subject.display_text}
                                                                                value={subject.display_text}
                                                                                onSelect={() => {
                                                                                    form.setValue("address_type_id", subject.id)
                                                                                    setAddressTypeComboBoxOpen(false)
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

                                        <FormField
                                            control={form.control}
                                            name="zip_code_id"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel className="text-base">Zip Code</FormLabel>
                                                    <Popover open={zipCodeComboBoxOpen} onOpenChange={setZipCodeComboBoxOpen}>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    disabled={props.newAddressBtnDisable}
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    className={cn(
                                                                        "w-full justify-between",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value
                                                                        ? zipCodeList.find(
                                                                            (language) => language.id === field.value
                                                                        )?.zipcode
                                                                        : "Select Zip Code Type"}
                                                                    <Icons.chevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-[200px] p-0">
                                                            <Command>
                                                                <CommandInput placeholder="Search Zip Code..." />
                                                                <CommandEmpty>No Zip Code Not found.</CommandEmpty>
                                                                <CommandGroup>
                                                                    {zipCodeList.map((subject) => (
                                                                        <CommandList key={subject.id}>
                                                                            <CommandItem
                                                                                key={subject.zipcode}
                                                                                value={subject.zipcode}
                                                                                onSelect={() => {
                                                                                    form.setValue("zip_code_id", subject.id)
                                                                                    setAddressTypeComboBoxOpen(false)
                                                                                    handleZipCodeChange(subject)
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
                                                                                {subject.zipcode}
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

                                    </div>

                                    <SheetFooter className=" gap-2">
                                        <SheetClose asChild>
                                            <Button disabled={props.newAddressBtnDisable} variant="secondary" className="w-fit">
                                                {'Cancel'}
                                            </Button>
                                        </SheetClose>
                                        <Button disabled={props.newAddressBtnDisable} className="md:right-8 md:top-8 w-fit" type="submit">
                                            {props.newAddressLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
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

export default PatientAddNewAddress
