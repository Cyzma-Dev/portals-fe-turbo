import { useEffect, useState } from "react";
import { CommonService } from "../utility/service/commonService";
import { IZipOptions } from "../utility";


export const AddressZipOptionsHook = () => {
    const [zipCodeList, setZipCodeList] = useState<IZipOptions[]>([]);
    const [cityBasedZipCodeList, setCityBasedZipCodeList] = useState<IZipOptions[]>([]);
    const [cityId, setCityId] = useState<number>(0);
    const [isZipLoading, setIsZipLoading] = useState<boolean>(false);
    useEffect(() => {
        if (cityId) {
            fetchZipCodeList(cityId);
        }

    }, [cityId]);
    useEffect(() => {
        fetchZipCodeList(0);
    }, []);

    const fetchZipCodeList = async (cityId: number) => {
        setIsZipLoading(true);
        try {
            const result = await CommonService.getZipCodeList(cityId);
            cityId && setCityBasedZipCodeList(result.results);
            !cityId && setZipCodeList(result.results);
        } catch (error) {
            console.log('Error =', error);
        }
        finally {
            setIsZipLoading(false);
        }
    };
    return { zipCodeList, setCityId, cityId, setZipCodeList, isZipLoading, cityBasedZipCodeList, setCityBasedZipCodeList };
};
