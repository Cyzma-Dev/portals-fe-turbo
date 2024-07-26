import { z } from "zod";
import { accountCreationSchema } from "./schema";

export type IAccountCreationTypes = z.infer<typeof accountCreationSchema>;