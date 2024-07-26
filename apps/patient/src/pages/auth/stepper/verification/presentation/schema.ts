import { z } from "zod";

export const verificationSchema = z.object({
    last_name: z.string()
        .min(1, 'Last name is required'),
    rx_number: z.string()
        .min(1, 'RX number is required'),
    dob: z.date({
        required_error: "A date of birth is required.",
      }),
    zip_code: z.string()
        .min(1, 'Zipcode is required')
        .refine(value => !isNaN(Number(value)), {
            message: 'Zipcode must be a number',
        })
        .transform(value => Number(value)),
});