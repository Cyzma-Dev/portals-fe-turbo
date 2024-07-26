import { z } from "zod";

export const accountCreationSchema = z.object({
    username: z.string()
        .min(1, 'Last name is required'),
    phone: z.string()
        .min(1, 'RX number is required'),
    password: z.string()
        .min(1, 'Password is required')
        .min(8, 'Must be at least 8 characters long'),
    confirm_password: z.string()
        .min(1, 'Confirm Password is required')
});