import { z } from "zod";

export const userLoginSchema = z.object({
    username: z.string()
          .min(1, 'Username is required')
          .email('Invalid email'),
    password: z.string()
        .min(1, 'Password is required')
});