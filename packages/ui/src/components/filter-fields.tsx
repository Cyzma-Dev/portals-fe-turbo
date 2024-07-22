import React from 'react';
import { Input } from '../shadcn/ui';

interface FilterProps {
	handleFilterChange: (field: any, operator: any, event: any) => void;
	listColumns: any[];
	options?: any;
	filterOpen: boolean;
}
const FilterFields = (props: FilterProps) => {
	const toFilter = props.listColumns.filter((item) => item.toFilter);
	return (
        <div className='grid md:grid-cols-5 gap-3'>
            {toFilter.map((value, index) => {
                return (
                    <div key={index}>
                        {value.searchType == 'text' && (
                            <Input
                                placeholder={value.headerName}
                                name='search'
                                onChange={(event) => {
                                    props.handleFilterChange(value.accessorKey, value.operator, event);
                                }}
                            />
                        )}
                        {/* {value.searchType == 'select' && (
                            <div style={{ width: '260px', marginTop: '20px' }}>
                                <MuiSelect
                                    options={props.options}
                                    variant='standard'
                                    label={value.headerName}
                                    name='gender'
                                    onChange={(event: any) => {
                                        props.handleFilterChange(value.field, value.operator, event);
                                    }}
                                    isLightMode={props.isLightMode}
                                />
                            </div>
                        )}
                        {value.searchType == 'date' && (
                            <div style={{ width: '260px', marginTop: '20px' }}>
                                <MuiDateField
                                    name='dob'
                                    label='DOB'
                                    margin='normal'
                                    onChange={(event: any) => {
                                        props.handleFilterChange(value.field, value.operator, event);
                                    }}
                                    isLightMode={props.isLightMode}
                                />
                            </div>
                        )} */}
                    </div>
                )
            })}
        </div>
	);
};

export default FilterFields;
