import { z } from "zod";

export const changePasswordSchema = z.object({
    current_password: z.string()
        .min(1, 'Current Password is required')
        .min(8, 'Must be at least 8 characters long'),
    password: z.string()
        .min(1, 'New Password is required')
        .min(8, 'Must be at least 8 characters long'),
    confirm_password: z.string()
        .min(1, 'Confirm Password is required')
        .min(8, 'Must be at least 8 characters long'),
});