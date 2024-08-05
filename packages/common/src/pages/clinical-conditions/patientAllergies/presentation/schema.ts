import * as z from "zod";

export const addPatientAllergiesSchema = z.object({
    condition_value_ids: z.array(
        z.object({
            id: z.number(),
        })
    ).min(1, "Allergy is required"),
    notes: z.string(),
});
export const editPatientAllergiesSchema = z.object({
    condition_value_ids: z.array(z.number()),
    notes: z.string().min(1, "Note is required"),
});

