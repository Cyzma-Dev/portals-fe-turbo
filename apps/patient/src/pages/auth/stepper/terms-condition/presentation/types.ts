import { z } from "zod";
import { accountActivationSchema } from "./schema";

export interface ITosTemplate {
    is_logo: boolean;
    is_toc: boolean;
    toc: string;
    toc_footer: any;
    thankyou_config: any;
}

export type IActivationSubmitTypes = z.infer<typeof accountActivationSchema> 