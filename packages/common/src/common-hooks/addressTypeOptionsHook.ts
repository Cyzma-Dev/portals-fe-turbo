import { useState } from 'react';
import { IOptions } from '../utility';
import { CommonService } from '../utility/service/commonService';

export const AddressTypeOptionsHook = () => {
    const [loading, setLoading] = useState(true);
    const [addressOptionsData, setAddressOptionsData] = useState<IOptions[]>([]);

    const fetchAddressTypeData = async () => {
        try {
            setLoading(true);
            const result = await CommonService.getAddressTypeOptions();
            setAddressOptionsData(result.results);
        } catch (error) {
            console.log('Error =', error);
        } finally {
            setLoading(false);
        }
    };

    return { addressOptionsData, fetchAddressTypeData, loading };
};
