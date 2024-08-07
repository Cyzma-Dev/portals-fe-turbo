export interface IOptions {
    id: number;
    display_text: string;
}

export interface IActiveAddressOptions extends IOptions {
    address_type_name?: string;

}
export interface ICityOptions {
    id: number;
    city: string;
    lookup_item_id: number;
}
export interface IZipOptions {
    id: number;
    zipcode: number;
    city_id: number;
}