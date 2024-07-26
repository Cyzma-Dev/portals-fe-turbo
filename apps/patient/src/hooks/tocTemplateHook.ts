import { useEffect, useState } from "react";
import { TocTemplateService } from "../utility";
import { ITosTemplate } from "../pages/auth/stepper/terms-condition/presentation/types";

export const TocTemplateHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
	const [tosTemplateData, setTosTemplateData] = useState<ITosTemplate>();

  const getTosTemplate = async () => {
    try {
      const result = await TocTemplateService.get();
      setTosTemplateData(result.results)
    } catch (error: any) {
      setErrorMessage(error);
      setIsLoading(false);
      return error?.data.message || error?.data.error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    getTosTemplate()
  },[])
  return { getTosTemplate, errorMessage, isLoading, setIsLoading, tosTemplateData, setTosTemplateData };
};
