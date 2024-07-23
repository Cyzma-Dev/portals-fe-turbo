import * as z from "zod"

export const addPatientNotesSchema = z.object({
    subject_id: z.number(),
    note_text: z.string().optional(),
});
