import { z } from "zod";
import { verificationSchema } from "./schema";

export interface IPatientVerification {
    rx_number: string;
    last_name: string;
    dob: Date;
    zip_code: number;
}

export type IVerificationTypes = z.infer<typeof verificationSchema>;