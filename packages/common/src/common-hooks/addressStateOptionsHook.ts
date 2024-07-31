import { useState } from "react";
import { IOptions } from "../utility";
import { CommonService } from "../utility/service/commonService";

export const AddressStateOptionsHook = () => {
    const [stateList, setStateList] = useState<IOptions[]>([]);

    const fetchStateList = async () => {
        try {
            const result = await CommonService.getStateList();
            setStateList(result.results);
        } catch (error) {
            console.log('Error =', error);
        }
    };
    return { fetchStateList, stateList };
};
