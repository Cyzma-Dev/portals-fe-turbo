import { z } from "zod";

export const userLoginSchema = z.object({
    username: z.string()
          .min(1, 'Username is required')
          .email('Invalid email')
          .max(30),
    password: z.string()
        .min(1, 'Password is required')
});