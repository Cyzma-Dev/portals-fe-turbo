import { z } from "zod";

export const accountActivationSchema = z.object({
    "is_toc": z.boolean()
})