import * as z from "zod"

export const addPatientHighRiskSchema = z.object({
    subject_id: z.number(),
    note_text: z.string(),
});
