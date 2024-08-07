import { useEffect, useState } from 'react';
import { CommonService } from '../utility/service/commonService';
import { ICityOptions, IOptions } from '../utility';


export const AddressCityOptionsHook = () => {
    const [cityList, setCityList] = useState<ICityOptions[]>([]);
    const [stateBasedCityList, setStateBasedCityList] = useState<IOptions[]>([]);
    const [stateId, setStateId] = useState<number>(0);
    const [isCityLoading, setIsCityLoading] = useState<boolean>(false);


    useEffect(() => {
        if (stateId) {
            fetchCityList(stateId);
        }
    }, [stateId]);

    useEffect(() => {
        fetchCityList(0);
    }, []);

    const fetchCityList = async (stateId: number) => {
        try {
            setIsCityLoading(true);
            const result = await CommonService.getCityList(stateId);
            stateId && setStateBasedCityList(result.results);
            !stateId && setCityList(result.results);
        } catch (error) {
            console.log('Error =', error);
        }
        finally {
            setIsCityLoading(false);

        }
    };

    return { cityList, fetchCityList, setStateId, stateId, setCityList, isCityLoading, stateBasedCityList, setStateBasedCityList };
};
