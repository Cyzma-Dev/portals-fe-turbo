import * as z from "zod"

export const addDocumentsSchema = z.object({
    document_name: z.string(),
    subject: z.number(),
    note: z.string().optional(),
});
