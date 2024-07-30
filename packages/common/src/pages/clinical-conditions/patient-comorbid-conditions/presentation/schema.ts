import * as z from "zod"

export const addPatientComorbidSchema = z.object({
    subject_id: z.number(),
    note_text: z.string(),
});
