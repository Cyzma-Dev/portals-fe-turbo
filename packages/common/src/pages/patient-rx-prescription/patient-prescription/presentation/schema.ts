import * as z from "zod"

export const RefillRequestSchema = z.object({

    address: z.number(),
    note: z.string().optional(),
});


export const addNewAddressSchema = z.object({
    address: z.string().optional(),
    state_id: z.number(),
    city_id: z.number(),
    address_type_id: z.number(),
    zip_code_id: z.number(),
});
